const https = require('https');

const MAX_BODY_BYTES = 16 * 1024;
const SUPABASE_TABLE = 'early_access_signups';

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  if (Buffer.isBuffer(request.body)) {
    if (request.body.length > MAX_BODY_BYTES) {
      return Promise.reject(new Error('Request body is too large'));
    }
    const rawBody = request.body.toString('utf8');
    return Promise.resolve(rawBody.trim() ? JSON.parse(rawBody) : {});
  }

  if (request.body && typeof request.body === 'object') {
    return Promise.resolve(request.body);
  }

  if (typeof request.body === 'string') {
    if (Buffer.byteLength(request.body, 'utf8') > MAX_BODY_BYTES) {
      return Promise.reject(new Error('Request body is too large'));
    }
    return Promise.resolve(request.body.trim() ? JSON.parse(request.body) : {});
  }

  return new Promise((resolve, reject) => {
    let rawBody = '';
    let rawBytes = 0;

    request.on('data', chunk => {
      rawBytes += Buffer.byteLength(chunk);
      if (rawBytes > MAX_BODY_BYTES) {
        reject(new Error('Request body is too large'));
        request.destroy();
        return;
      }
      rawBody += chunk;
    });

    request.on('end', () => {
      if (!rawBody.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(new Error('Request body must be valid JSON'));
      }
    });

    request.on('error', reject);
  });
}

function trimString(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function optionalText(value, maxLength) {
  const trimmed = trimString(value, maxLength);
  return trimmed || null;
}

function parseConsent(value) {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function normalizeSignup(body, request) {
  const email = trimString(body.email, 254).toLowerCase();
  const consent = parseConsent(body.consent);
  const metadata = body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
    ? body.metadata
    : {};

  return {
    name: trimString(body.name, 120),
    email,
    country: optionalText(body.country, 120),
    age_range: optionalText(body.age_range, 40),
    gender: optionalText(body.gender, 80),
    user_type: optionalText(body.user_type, 80),
    message: optionalText(body.message, 1000),
    consent,
    source: 'kandid_spot_app',
    page: optionalText(body.page, 240),
    referrer: optionalText(request.headers.referer || body.referrer, 500),
    user_agent: optionalText(request.headers['user-agent'] || body.user_agent, 500),
    session_id: optionalText(body.session_id, 120),
    metadata,
  };
}

function validateSignup(signup) {
  if (!signup.name) return 'Name is required.';
  if (!signup.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) {
    return 'A valid email is required.';
  }
  if (!signup.consent) return 'Consent is required.';
  return '';
}

function resolveSupabaseEndpoint() {
  const supabaseUrl = String(process.env.SUPABASE_URL || '').trim().replace(/^["']|["']$/g, '');
  const serviceRoleKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      ok: false,
      status: 500,
      error: 'Early access signup is not configured yet.',
    };
  }

  const normalizedUrl = supabaseUrl
    .replace(/\/rest\/v1\/?$/i, '')
    .replace(/\/+$/, '');

  try {
    const endpoint = new URL(`/rest/v1/${SUPABASE_TABLE}`, normalizedUrl);
    return {
      ok: true,
      endpoint: endpoint.toString(),
      serviceRoleKey,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: 'Supabase URL is not configured correctly.',
    };
  }
}

function postJsonWithHttps(endpoint, headers, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const request = https.request({
      method: 'POST',
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      headers,
    }, response => {
      response.resume();
      response.on('end', () => {
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          status: response.statusCode,
        });
      });
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
}

function postJson(endpoint, headers, body) {
  if (typeof fetch === 'function') {
    return fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    });
  }

  return postJsonWithHttps(endpoint, headers, body);
}

async function insertSignup(signup) {
  const config = resolveSupabaseEndpoint();
  if (!config.ok) return config;

  const body = JSON.stringify(signup);
  const headers = {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    'Content-Type': 'application/json',
    'Content-Length': String(Buffer.byteLength(body)),
    Prefer: 'return=minimal',
  };

  let response;
  try {
    response = await postJson(config.endpoint, headers, body);
  } catch (error) {
    console.warn('[early-access] Supabase insert request failed:', error.message);
    return {
      ok: false,
      status: 502,
      error: 'Could not reach Supabase right now.',
    };
  }

  if (response.ok) {
    return { ok: true };
  }

  if (response.status === 409) {
    return { ok: true, duplicate: true };
  }

  return {
    ok: false,
    status: 502,
    error: 'Could not save your signup right now.',
  };
}

module.exports = async function earlyAccessHandler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    sendJson(response, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }

  const contentType = String(request.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    sendJson(response, 415, { ok: false, error: 'Request must be JSON.' });
    return;
  }

  try {
    const body = await readRequestBody(request);

    if (trimString(body.company_website, 300)) {
      sendJson(response, 200, { ok: true });
      return;
    }

    const signup = normalizeSignup(body, request);
    const validationError = validateSignup(signup);
    if (validationError) {
      sendJson(response, 400, { ok: false, error: validationError });
      return;
    }

    const result = await insertSignup(signup);
    if (!result.ok) {
      sendJson(response, result.status || 502, { ok: false, error: result.error });
      return;
    }

    sendJson(response, 200, result.duplicate ? { ok: true, duplicate: true } : { ok: true });
  } catch (error) {
    const message = error.message === 'Request body is too large'
      ? 'Request body is too large.'
      : 'Could not process early access signup.';
    sendJson(response, 400, { ok: false, error: message });
  }
};
