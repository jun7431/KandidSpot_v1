/* global React, ReactDOM */
/* global StarFilled, StarOutline, StarSparkle, Heart, Scribble, Dot */
/* global Cutout, DecorScatter, Annotation */
/* global useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSlider, TweakColor */

const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   DATA
   ========================================================= */

const AREAS = [
{ value: "Hongdae / Yeonnam", sub: "youth · indie · late night", c1: "#7A4E3A", c2: "#553424", label: "hongdae lane" },
{ value: "Seongsu", sub: "cafes · brands · workshops", c1: "#3D5174", c2: "#26334D", label: "seongsu cafe" },
{ value: "Anguk / Bukchon", sub: "tradition · small lanes", c1: "#8C7042", c2: "#5C4626", label: "hanok roof" },
{ value: "Myeongdong / Euljiro", sub: "central food + shopping", c1: "#B33A2A", c2: "#7A2418", label: "euljiro sign" },
{ value: "Itaewon / Hannam", sub: "global food + design", c1: "#4A4458", c2: "#2D283A", label: "hannam shop" },
{ value: "Gangnam / Sinsa", sub: "polished · trendy · busy", c1: "#2B6F4E", c2: "#1A4530", label: "sinsa block" }];


const TIMES = [
{ value: "30–60 min", sub: "I arrived early", c1: "#C49A2D", c2: "#8C6E1C", label: "30 min" },
{ value: "1–2 hours", sub: "a quick nearby loop", c1: "#3D5174", c2: "#26334D", label: "~2 hr" },
{ value: "2–3 hours", sub: "a relaxed route", c1: "#7A4E3A", c2: "#553424", label: "~3 hr" },
{ value: "Half day", sub: "the long way around", c1: "#2B6F4E", c2: "#1A4530", label: "½ day" }];


const MOODS = [
{ value: "Local food", sub: "meals locals save", c1: "#FFD7CC", c2: "#FFBCAA", label: "ramen bowl" },
{ value: "Cafes & dessert", sub: "coffee, bakery, sweets", c1: "#FFE9A8", c2: "#FFD66B", label: "espresso" },
{ value: "Drinks & night", sub: "bars, lights, late", c1: "#E7E1FF", c2: "#D2C8FF", label: "natural wine" },
{ value: "Shop & browse", sub: "books, small brands", c1: "#FFD9E8", c2: "#FFC0D6", label: "vinyl shop" },
{ value: "Culture & activities", sub: "exhibits, classes", c1: "#D8E3FF", c2: "#B9CDFF", label: "gallery" },
{ value: "Walks & views", sub: "parks, lanes, photos", c1: "#D8F6E4", c2: "#B7EDCC", label: "park bench" }];


// Route results vary by mood — keep it small but real-feeling.
const ROUTES = {
  "Local food": [
  { name: "Yeonnam Galmaegisal", type: "backstreet bbq", stay: "55 min", walk: "5 min walk", why: "ten-seat spot tucked behind the main strip; older neighborhood crowd.", c1: "#FFD7CC", c2: "#FFBCAA", label: "bbq grill" },
  { name: "Gyeongui Line Forest", type: "park lane", stay: "20 min", walk: "8 min walk", why: "old rail-line turned linear park; the cooling-off stretch.", c1: "#D8F6E4", c2: "#B7EDCC", label: "park lane" },
  { name: "Café Pause", type: "tiny cafe", stay: "30 min", walk: "4 min walk", why: "single-origin, no laptops, big front window — a real sit-down.", c1: "#FFE9A8", c2: "#FFD66B", label: "espresso cup" },
  { name: "Record Shop Donguri", type: "vinyl shop", stay: "20 min", walk: "—", why: "korean indie + city pop; the owner will play whatever you ask.", c1: "#FFD9E8", c2: "#FFC0D6", label: "vinyl crate" }],

  "Cafes & dessert": [
  { name: "Felt Coffee", type: "tasting bar", stay: "35 min", walk: "—", why: "filter flight on a marble counter; minimal, focused.", c1: "#FFE9A8", c2: "#FFD66B", label: "filter set" },
  { name: "Gyeongui Line Forest", type: "park lane", stay: "15 min", walk: "6 min walk", why: "the walking stretch between cafes.", c1: "#D8F6E4", c2: "#B7EDCC", label: "park bench" },
  { name: "Eclair de Génie", type: "patisserie", stay: "25 min", walk: "7 min walk", why: "the éclair pull is for real; sit upstairs near the window.", c1: "#FFD9E8", c2: "#FFC0D6", label: "patisserie" },
  { name: "Anthracite", type: "warehouse cafe", stay: "30 min", walk: "9 min walk", why: "old shoe-factory; concrete + greenery, ends the loop slow.", c1: "#E1F0FF", c2: "#C9E3FF", label: "concrete cafe" }],

  "Drinks & night": [
  { name: "Mortar", type: "natural wine", stay: "60 min", walk: "—", why: "smaller-producer list; the bartender pours generously.", c1: "#E7E1FF", c2: "#D2C8FF", label: "natural wine" },
  { name: "Yeonnam back lanes", type: "neighborhood walk", stay: "15 min", walk: "5 min walk", why: "low-rise residential; the right vibe between drinks.", c1: "#D8F6E4", c2: "#B7EDCC", label: "back lane" },
  { name: "Hidden Trash", type: "listening bar", stay: "45 min", walk: "8 min walk", why: "vinyl-only, small room, no menu — order what they pour.", c1: "#FFD9E8", c2: "#FFC0D6", label: "listening bar" },
  { name: "Late noodle, Hyodo", type: "supper", stay: "30 min", walk: "6 min walk", why: "open until 3am; the close-out bowl.", c1: "#FFD7CC", c2: "#FFBCAA", label: "late noodles" }]

};

const REFINES = [
{ id: "walk", label: "less walking", emoji: "🚶" },
{ id: "local", label: "more local", emoji: "🏘️" },
{ id: "cheap", label: "cheaper", emoji: "💸" },
{ id: "cafe", label: "more cafes", emoji: "☕" },
{ id: "quiet", label: "avoid crowds", emoji: "🤫" },
{ id: "open", label: "open right now", emoji: "🟢" }];


/* =========================================================
   COMPONENTS
   ========================================================= */

function Brand() {
  return (
    <div className="ks-topbar-left">
      <span className="ks-logo">
        <span className="ks-logo-bracket">[</span>kandid.spot<span className="ks-logo-bracket">]</span>
      </span>
      <span className="ks-tag-mono">seoul · v2026</span>
    </div>);

}

function TopBar({ onNew, onSaved, screen }) {
  return (
    <header className="ks-topbar">
      <Brand />
      <div className="ks-topbar-right">
        {screen === "result" &&
        <button className="ks-nav-item" onClick={onNew}>+ new route</button>
        }
        <button className="ks-nav-item" onClick={onSaved}>saved</button>
        <button className="ks-nav-item primary">JK</button>
      </div>
    </header>);

}

function BottomStrip() {
  return (
    <div className="ks-bottom-strip">
      <span>kandid.spot</span>
      <span className="dot"></span>
      <span>seoul / curated by locals</span>
      <span className="dot"></span>
      <span>not a top-10 list</span>
      <span style={{ marginLeft: "auto", opacity: 0.7 }}>vol. 01 · 2026</span>
    </div>);

}

/* ---------- LANDING ---------- */
function Landing({ onStart }) {
  return (
    <div className="ks-hero">
      <div className="ks-hero-grid">
        {/* LEFT — editorial headline */}
        <div className="ks-hero-left">
          <div className="ks-hero-eyebrow">
            <span>kandid.spot</span>
            <span className="ks-hero-eyebrow-rule"></span>
            <span>vol. 01 / seoul</span>
          </div>

          <h1 className="ks-hero-headline">
            One <span className="italic">candid</span> route<br />
            through <span className="accent">Seoul</span>.
          </h1>

          <p className="ks-hero-lead">
            Tell us where you are, how much time you've got, and what feels right.
            We hand back <em>one</em> route worth walking — picked by people who
            actually live here.
          </p>

          <div className="ks-hero-ctrow">
            <button className="ks-cta" onClick={onStart}>
              start the route
              <span className="ks-cta-arrow">→</span>
            </button>
            <button className="ks-circled-cta">how it works</button>
          </div>

          <div className="ks-hero-meta">
            <span>area</span><span>·</span>
            <span>time</span><span>·</span>
            <span>mood</span><span>·</span>
            <span className="result">your route</span>
          </div>
        </div>

        {/* RIGHT — graphic composition */}
        <div className="ks-hero-right">
          <div className="ks-hero-tile ks-tile-1">
            <Cutout label="ramen / 11pm" c1="#FFD7CC" c2="#FFBCAA" radius={0} />
            <span className="ks-tile-num">01</span>
            <span className="ks-tile-cap">backstreet meal</span>
          </div>
          <div className="ks-hero-tile ks-tile-2">
            <div className="ks-tile-blue">
              <div className="ks-tile-blue-display">
                <span className="ks-tile-blue-label">SEOUL</span>
                <span className="ks-tile-blue-time">21:48</span>
              </div>
            </div>
            <span className="ks-tile-num">02</span>
            <span className="ks-tile-cap">walking</span>
          </div>
          <div className="ks-hero-tile ks-tile-3">
            <Cutout label="vinyl shop" c1="#FFE9A8" c2="#FFD66B" radius={0} />
            <span className="ks-tile-num">03</span>
            <span className="ks-tile-cap">a quiet stop</span>
          </div>
          <div className="ks-hero-tile ks-tile-4">
            <div className="ks-tile-black">
              <span className="ks-tile-black-x">×</span>
              <span className="ks-tile-black-text">candid / not curated</span>
            </div>
            <span className="ks-tile-num">04</span>
            <span className="ks-tile-cap">ending</span>
          </div>

          {/* one annotation tag, not many */}
          <span className="ks-hero-anno">
            <span className="ks-hero-anno-line"></span>
            chosen by a local · 18 min walk
          </span>
        </div>
      </div>
    </div>);

}

/* ---------- ONBOARDING STEPS ---------- */
function StepHeader({ step, total, kicker, headline, sub }) {
  return (
    <>
      <div className="ks-progress">
        {Array.from({ length: total }).map((_, i) =>
        <span key={i} className={`ks-progress-seg ${i < step - 1 ? "done" : i === step - 1 ? "active" : ""}`} />
        )}
      </div>
      <div className="ks-step-tag">
        <span className="pill">step {step} / {total}</span>
        <span>{kicker}</span>
      </div>
      <h1 className="ks-q-headline">{headline}</h1>
      {sub && <p className="ks-q-sub">{sub}</p>}
    </>);

}

function PolaroidGrid({ options, value, onChange }) {
  return (
    <div className="ks-polaroids">
      {options.map((o, i) => (
        <button
          key={o.value}
          type="button"
          className={`ks-polaroid ${value === o.value ? "selected" : ""}`}
          onClick={() => onChange(o.value)}
          style={{ "--tilt": `${(i % 2 === 0 ? -1 : 1) * (0.6 + (i * 0.3))}deg` }}
        >
          <div className="ks-polaroid-photo">
            <Cutout label={o.label} c1={o.c1} c2={o.c2} radius={0} />
            <div className="ks-polaroid-grad"></div>
            <span className="ks-polaroid-num">{String(i + 1).padStart(2, "0")} / {String(options.length).padStart(2, "0")}</span>
            <div className="ks-polaroid-meta">
              <div className="ks-polaroid-name">{o.value}</div>
              <div className="ks-polaroid-sub">{o.sub}</div>
            </div>
            <span className="ks-polaroid-check">✓</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// Mood folder picker — files-on-desktop style
const FOLDER_PALETTE = [
  { tab: "#FFB8C8", body: "#FFD9E8" }, // pink
  { tab: "#A8C7FF", body: "#D8E3FF" }, // blue
  { tab: "#FFD66B", body: "#FFE9A8" }, // yellow
  { tab: "#9CD9B6", body: "#D8F6E4" }, // green
  { tab: "#C9BDFF", body: "#E7E1FF" }, // lavender
  { tab: "#FFB199", body: "#FFD7CC" }, // peach
];

function Folder({ option, idx, selected, onClick }) {
  const c = FOLDER_PALETTE[idx % FOLDER_PALETTE.length];
  // Slightly different rotated "contents" peeking out of each folder.
  const peeks = [
    { c1: "#E8DDD5", c2: "#D6C8BC", rot: -8,  x: "12%" },
    { c1: "#3A3A3A", c2: "#1F1F1F", rot:  4,  x: "38%" },
    { c1: "#F4B942", c2: "#E29D2C", rot: -2,  x: "60%" },
  ];
  return (
    <button
      type="button"
      className={`ks-folder ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {/* Stuff peeking out from above the folder */}
      <div className="ks-folder-peeks">
        {peeks.map((p, i) => (
          <div
            key={i}
            className="ks-folder-peek"
            style={{ left: p.x, transform: `rotate(${p.rot}deg)` }}
          >
            <Cutout label="" c1={p.c1} c2={p.c2} radius={3} />
          </div>
        ))}
      </div>
      {/* The folder body */}
      <svg className="ks-folder-svg" viewBox="0 0 220 130" preserveAspectRatio="none">
        {/* tab */}
        <path d="M0 16 Q0 6 10 6 L80 6 L92 16 L220 16 L220 22 L0 22 Z" fill={c.tab} stroke="#0E0E0C" strokeWidth="1.5" strokeLinejoin="round" />
        {/* body */}
        <path d="M0 20 L220 20 L220 130 L0 130 Z" fill={c.body} stroke="#0E0E0C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="ks-folder-name">{option.value}</span>
      <span className="ks-folder-sub">{option.sub}</span>
      <span className="ks-folder-check">{selected ? "✓ selected" : "double-click to open"}</span>
    </button>
  );
}

function FolderGrid({ options, value, onChange }) {
  return (
    <div className="ks-folders">
      {options.map((o, i) => (
        <Folder
          key={o.value}
          option={o}
          idx={i}
          selected={value === o.value}
          onClick={() => onChange(o.value)}
        />
      ))}
    </div>
  );
}

function Onboard({ step, picks, setPicks, onBack, onNext }) {
  const conf = {
    1: { kicker: "where are you now?", headline: <>where are <span className="serif-it">you</span> right now?</>, sub: "pick a neighborhood — we'll anchor the route there. one is enough.", options: AREAS, key: "area", grid: "polaroid" },
    2: { kicker: "how much time?", headline: <>how much <span className="accent">time</span>?</>, sub: "we keep the route realistic for the window you've got.", options: TIMES, key: "time", grid: "polaroid" },
    3: { kicker: "what's the vibe?", headline: <>what's the <span className="serif-it">vibe?</span></>, sub: "pick a folder. we'll handle the order, the timing, and the picks.", options: MOODS, key: "mood", grid: "folder" }
  }[step];

  const value = picks[conf.key];
  const canNext = !!value;
  const Grid = conf.grid === "folder" ? FolderGrid : PolaroidGrid;

  return (
    <div className="ks-onboard">
      <DecorScatter seed={step * 17} density={6} palette={["blue", "black"]} />
      <div style={{ position: "relative", zIndex: 5 }}>
        <StepHeader step={step} total={3} kicker={conf.kicker} headline={conf.headline} sub={conf.sub} />
        <Grid
          options={conf.options}
          value={value}
          onChange={(v) => setPicks({ ...picks, [conf.key]: v })}
        />

        <div className="ks-actions">
          <div className="left">
            <button className="ks-btn-back" disabled={step === 1} onClick={onBack}>← back</button>
          </div>
          <div className="right">
            <span style={{ fontFamily: "var(--ks-mono)", fontSize: 11, color: "var(--ks-ink-soft)", marginRight: 8 }}>
              {Object.values(picks).filter(Boolean).length} / 3 picked
            </span>
            <button className="ks-btn-next" disabled={!canNext} onClick={onNext}>
              {step === 3 ? "build my route →" : "next →"}
            </button>
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- LOADING ---------- */
const LOADING_STEPS = [
"[ reading the streets ]",
"[ checking walking time ]",
"[ matching the mood ]",
"[ avoiding obvious tourist traps ]",
"[ finding a route you can start now ]"];


function Loading({ area }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LOADING_STEPS.length), 700);
    return () => clearInterval(t);
  }, []);
  const cards = [
  { x: "10%", y: "20%", rot: -8, label: "ramen bowl", c1: "#FFD7CC", c2: "#FFBCAA" },
  { x: "30%", y: "60%", rot: 6, label: "espresso", c1: "#FFE9A8", c2: "#FFD66B" },
  { x: "55%", y: "10%", rot: -3, label: "vinyl crate", c1: "#FFD9E8", c2: "#FFC0D6" },
  { x: "78%", y: "55%", rot: 9, label: "park bench", c1: "#D8F6E4", c2: "#B7EDCC" }];

  return (
    <div className="ks-loading">
      <DecorScatter seed={91} density={10} palette={["blue", "black", "yellow"]} />
      <div style={{ position: "relative", zIndex: 5 }}>
        <div style={{ fontFamily: "var(--ks-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ks-ink-soft)" }}>
          ✦ building your route ✦
        </div>
        <h1 className="ks-loading-headline">
          one <span className="accent">candid</span> route<br />
          through <span style={{ fontFamily: "var(--ks-serif)", fontStyle: "italic", color: "var(--ks-blue)" }}>{area || "seoul"}</span>…
        </h1>
        <div className="ks-loading-step">{LOADING_STEPS[idx]}</div>

        <div className="ks-loading-shuffler">
          {cards.map((c, i) =>
          <div
            key={i}
            className="ks-loading-card"
            style={{ left: c.x, top: c.y, "--rot": `${c.rot}deg`, animationDelay: `${i * 0.3}s` }}>
            
              <Cutout label={c.label} c1={c.c1} c2={c.c2} radius={14} />
            </div>
          )}
        </div>
      </div>
    </div>);

}

/* ---------- MAP (custom SVG) ---------- */
function RouteMap({ stops, activeIdx, onPick }) {
  // pin positions (% inside viewBox)
  const positions = [
  { x: 22, y: 70 },
  { x: 38, y: 38 },
  { x: 62, y: 50 },
  { x: 78, y: 24 }];

  const path = positions.
  map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).
  join(" ");
  return (
    <div className="ks-map-frame">
      {/* toolbar */}
      <div className="ks-map-toolbar">
        <span className="ks-map-loc">
          <Dot size={6} color="#1B3FE0" />
          yeonnam-dong · mapo-gu
        </span>
        <div className="ks-map-ctrls">
          <button className="ks-map-ctrl" aria-label="zoom in">+</button>
          <button className="ks-map-ctrl" aria-label="zoom out">−</button>
          <button className="ks-map-ctrl" aria-label="locate">◎</button>
        </div>
      </div>

      <svg className="ks-map-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* paper texture grid */}
        <defs>
          <pattern id="ks-grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M6 0 L0 0 L0 6" fill="none" stroke="#E8E4DA" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#ks-grid)" />

        {/* "blocks" of buildings */}
        {[
        [10, 12, 18, 14], [34, 10, 16, 12], [56, 8, 18, 10], [78, 12, 14, 10],
        [8, 30, 14, 10], [26, 30, 18, 12], [50, 28, 12, 14], [68, 30, 14, 12], [86, 30, 8, 12],
        [12, 52, 16, 10], [34, 50, 14, 12], [54, 52, 14, 12], [72, 54, 18, 10],
        [18, 72, 14, 12], [40, 74, 16, 10], [64, 74, 12, 12], [82, 74, 12, 10]].
        map((b, i) =>
        <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} fill="#F4F1EA" stroke="#0E0E0C" strokeWidth="0.3" rx="0.6" />
        )}

        {/* roads (light) */}
        <line x1="0" y1="45" x2="100" y2="45" stroke="#E1DCCF" strokeWidth="2.2" />
        <line x1="48" y1="0" x2="48" y2="100" stroke="#E1DCCF" strokeWidth="2.2" />

        {/* walking line */}
        <path d={path} fill="none" stroke="#1B3FE0" strokeWidth="0.8" strokeDasharray="1.4 1.4" strokeLinecap="round" />

        {/* pins */}
        {positions.map((p, i) =>
        <g key={i} style={{ cursor: "pointer" }} onClick={() => onPick(i)}>
            {activeIdx === i &&
          <circle cx={p.x} cy={p.y} r="4.5" fill="#6CE6BA" opacity="0.5">
                <animate attributeName="r" values="4.5;7;4.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
          }
            <circle cx={p.x} cy={p.y} r="3" fill={activeIdx === i ? "#1B3FE0" : "#FF3B86"} stroke="#0E0E0C" strokeWidth="0.5" />
            <text x={p.x} y={p.y + 1} fontSize="3" textAnchor="middle" fill="white" fontFamily="var(--ks-display)" fontWeight="700">{i + 1}</text>
          </g>
        )}

        {/* scattered stars on map */}
        <g opacity="0.6">
          <text x="14" y="20" fontSize="3" fill="#0E0E0C">★</text>
          <text x="88" y="60" fontSize="3" fill="#0E0E0C">★</text>
          <text x="46" y="86" fontSize="3" fill="#FF3B86">★</text>
          <text x="68" y="14" fontSize="3" fill="#FFD23D">★</text>
        </g>
      </svg>

      {/* floating place card */}
      {activeIdx != null && stops[activeIdx] &&
      <div className="ks-float-card">
          <div className="ks-float-num">{activeIdx + 1}</div>
          <div className="ks-float-body">
            <div className="ks-float-name">{stops[activeIdx].name}</div>
            <div className="ks-float-meta">{stops[activeIdx].type} · {stops[activeIdx].stay}</div>
          </div>
          <Cutout label={stops[activeIdx].label} c1={stops[activeIdx].c1} c2={stops[activeIdx].c2}
        style={{ width: 56, height: 56, borderRadius: 12, border: "1.5px solid var(--ks-rule)" }} />
        </div>
      }
    </div>);

}

/* ---------- RESULT ---------- */
function Result({ picks, onEdit, onToast }) {
  const stops = ROUTES[picks.mood] || ROUTES["Local food"];
  const [activeIdx, setActiveIdx] = useState(0);
  const [refines, setRefines] = useState([]);

  const toggleRefine = (id) => {
    setRefines((rs) => rs.includes(id) ? rs.filter((r) => r !== id) : [...rs, id]);
    onToast("refining the route…");
  };

  return (
    <div className="ks-result">
      <div className="ks-result-left">
        <DecorScatter seed={43} density={4} palette={["blue"]} />
        <div style={{ position: "relative", zIndex: 5 }}>
          {/* Summary */}
          <div className="ks-summary">
            <div className="ks-summary-num">04</div>
            <div className="ks-summary-body">
              <div className="ks-summary-label">your situation</div>
              <div className="ks-summary-tags">{picks.area} · {picks.time} · {picks.mood}</div>
              <div className="ks-summary-meta">4 stops · 2h 05m total · 18 min walking</div>
            </div>
            <button className="ks-summary-edit" onClick={onEdit}>edit</button>
          </div>

          {/* Why */}
          <div className="ks-why">
            <span className="ks-why-tag">why this</span>
            <div className="ks-why-title">we skipped the strip.</div>
            <p className="ks-why-body">
              the main drag's crowded right now. we routed you through the lived-in lanes —
              a backstreet meal, a residential walk, a ten-seat cafe, a hidden record shop.
              all walkable. all open. all picked by people who actually live here.
            </p>
          </div>

          {/* Timeline */}
          <div className="ks-timeline">
            <div className="ks-timeline-head">
              <h2 className="ks-timeline-title">
                one <span className="italic">candid</span> route
              </h2>
              <span className="ks-timeline-sub">tap a stop for details</span>
            </div>

            {stops.map((s, i) =>
            <React.Fragment key={i}>
                <div
                className={`ks-stop ${activeIdx === i ? "active" : ""}`}
                onClick={() => setActiveIdx(i)}>
                
                  <div className="ks-stop-img">
                    <span className="ks-stop-num">{i + 1}</span>
                    <Cutout label={s.label} c1={s.c1} c2={s.c2} radius={10} />
                  </div>
                  <div className="ks-stop-body">
                    <div className="ks-stop-cap">{s.type}</div>
                    <div className="ks-stop-name">{s.name}</div>
                    <div className="ks-stop-meta">⏱ stay {s.stay}{s.walk !== "—" ? `  ·  → ${s.walk}` : ""}</div>
                  </div>
                </div>
                {i < stops.length - 1 &&
              <div className="ks-stop-walk">
                    <span className="ks-stop-walk-line"></span>
                    walk · {s.walk}
                    <span className="ks-stop-walk-line" style={{ flex: 1 }}></span>
                  </div>
              }
              </React.Fragment>
            )}
          </div>

          {/* Refine */}
          <div className="ks-refine">
            <div className="ks-refine-title">→ refine this route</div>
            <div className="ks-chips">
              {REFINES.map((r) =>
              <button
                key={r.id}
                className={`ks-chip ${refines.includes(r.id) ? "on" : ""}`}
                onClick={() => toggleRefine(r.id)}>
                {r.emoji} {r.label}</button>
              )}
            </div>
          </div>

          {/* Action bar */}
          <div className="ks-actionbar">
            <button className="ks-act" onClick={() => onToast("saved ♥")}>♥ save</button>
            <button className="ks-act" onClick={() => onToast("link copied")}>↗ share</button>
            <button className="ks-act primary" onClick={() => onToast("opening map…")}>
              open in map →
            </button>
          </div>
        </div>
      </div>

      <div className="ks-result-right">
        <DecorScatter seed={71} density={3} palette={["blue"]} />
        <div style={{ position: "relative", zIndex: 5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--ks-display)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.025em", margin: 0 }}>
              the <span style={{ fontFamily: "var(--ks-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--ks-blue)" }}>map</span>
            </h2>
            <span style={{ fontFamily: "var(--ks-mono)", fontSize: 11, color: "var(--ks-ink-soft)" }}>
              ★ tap a pin
            </span>
          </div>

          <RouteMap stops={stops} activeIdx={activeIdx} onPick={setActiveIdx} />

          {/* a little notes block under the map */}
          <div style={{
            marginTop: 18,
            padding: "14px 16px",
            border: "1.5px dashed var(--ks-rule)",
            borderRadius: 14,
            fontFamily: "var(--ks-mono)",
            fontSize: 11,
            lineHeight: 1.6,
            color: "var(--ks-ink)"
          }}>
            <strong style={{ letterSpacing: "0.04em" }}>NOTE:</strong>{" "}
            walking line is dashed because the route is meant to feel loose — you can
            zigzag, double back, stop somewhere we didn't pin. ★
          </div>

          <button className="ks-fab" onClick={() => onToast("ask kandid spot — coming soon")}>
            <span className="ks-fab-dot"></span>
            ask kandid spot
          </button>
        </div>
      </div>
    </div>);

}

/* =========================================================
   APP ROOT
   ========================================================= */

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "density": 1,
  "showStrip": true,
  "paperBg": "#F4F1EA"
} /*EDITMODE-END*/;

const ACCENT_PALETTES = {
  blue: { blue: "#1B3FE0", pink: "#FF3B86", yellow: "#FFD23D", mint: "#6CE6BA", red: "#E63A33" },
  electric: { blue: "#0033FF", pink: "#FF006E", yellow: "#FFE600", mint: "#00E5A8", red: "#FF2D2D" },
  warm: { blue: "#C53A2A", pink: "#FF6B6B", yellow: "#F4B942", mint: "#9CCBA0", red: "#8B2C20" },
  ink: { blue: "#0E0E0C", pink: "#FF3B86", yellow: "#FFD23D", mint: "#6CE6BA", red: "#E63A33" }
};

function App() {
  const [screen, setScreen] = useState("landing"); // landing | onboard | loading | result
  const [step, setStep] = useState(1);
  const [picks, setPicks] = useState({ area: "", time: "", mood: "" });
  const [toast, setToast] = useState("");

  const [tweaks, setTweak] = useTweaks(DEFAULT_TWEAKS);

  // Apply tweaks to CSS vars
  useEffect(() => {
    const p = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES.blue;
    const root = document.documentElement;
    root.style.setProperty("--ks-blue", p.blue);
    root.style.setProperty("--ks-pink", p.pink);
    root.style.setProperty("--ks-yellow", p.yellow);
    root.style.setProperty("--ks-mint", p.mint);
    root.style.setProperty("--ks-red", p.red);
    root.style.setProperty("--ks-bg", tweaks.paperBg);
  }, [tweaks.accent, tweaks.paperBg]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const onStart = () => {setScreen("onboard");setStep(1);};
  const onBack = () => {if (step > 1) setStep(step - 1);else setScreen("landing");};
  const onNext = () => {
    if (step < 3) setStep(step + 1);else
    {
      setScreen("loading");
      setTimeout(() => setScreen("result"), 2600);
    }
  };
  const onEdit = () => {setScreen("onboard");setStep(1);};
  const onNew = () => {setScreen("onboard");setStep(1);setPicks({ area: "", time: "", mood: "" });};
  const onSaved = () => showToast("no saved routes yet — try the first one!");

  return (
    <div className="ks-stage" style={{ padding: "0px" }}>
      <div className="ks-sheet" data-screen-label={`Kandid Spot · ${screen}`}>
        <TopBar onNew={onNew} onSaved={onSaved} screen={screen} />

        {screen === "landing" && <Landing onStart={onStart} />}
        {screen === "onboard" &&
        <Onboard
          step={step}
          picks={picks}
          setPicks={setPicks}
          onBack={onBack}
          onNext={onNext} />

        }
        {screen === "loading" && <Loading area={picks.area} />}
        {screen === "result" && <Result picks={picks} onEdit={onEdit} onToast={showToast} />}

        {tweaks.showStrip && <BottomStrip />}
      </div>

      <div className={`ks-toast ${toast ? "on" : ""}`}>{toast}</div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Look">
          <TweakRadio
            label="Accent palette"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
            { value: "blue", label: "Blue" },
            { value: "electric", label: "Electric" },
            { value: "warm", label: "Warm" },
            { value: "ink", label: "Ink" }]
            } />
          
          <TweakColor
            label="Paper background"
            value={tweaks.paperBg}
            onChange={(v) => setTweak("paperBg", v)}
            options={["#F4F1EA", "#FFFFFF", "#F2EEFF", "#0E0E0C", "#FFE9D6"]} />
          
          <TweakToggle
            label="Show bottom strip"
            value={tweaks.showStrip}
            onChange={(v) => setTweak("showStrip", v)} />
          
        </TweakSection>
        <TweakSection title="Quick jump">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <button className="ks-nav-item" onClick={() => setScreen("landing")}>landing</button>
            <button className="ks-nav-item" onClick={() => {setScreen("onboard");setStep(1);}}>onboard · step 1</button>
            <button className="ks-nav-item" onClick={() => {setScreen("onboard");setStep(2);}}>onboard · step 2</button>
            <button className="ks-nav-item" onClick={() => {setScreen("onboard");setStep(3);}}>onboard · step 3</button>
            <button className="ks-nav-item" onClick={() => setScreen("loading")}>loading</button>
            <button className="ks-nav-item" onClick={() => {
              setPicks({ area: "Hongdae / Yeonnam", time: "2–3 hours", mood: "Local food" });
              setScreen("result");
            }}>result</button>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);