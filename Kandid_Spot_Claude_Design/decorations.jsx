/* global React */

/* =========================================================
   DECORATIONS — stars, hearts, sparkles, scribbles, cutouts
   ========================================================= */

// ---------- STAR shapes (a few different styles) ----------
const StarFilled = ({ size = 24, color = "#FFD23D", stroke = "#0E0E0C", strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
    <path d="M12 2 L14.6 8.6 L21.5 9.2 L16.2 13.8 L17.9 20.5 L12 16.9 L6.1 20.5 L7.8 13.8 L2.5 9.2 L9.4 8.6 Z" />
  </svg>
);

const StarOutline = ({ size = 24, color = "#0E0E0C", strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 2 L14.6 8.6 L21.5 9.2 L16.2 13.8 L17.9 20.5 L12 16.9 L6.1 20.5 L7.8 13.8 L2.5 9.2 L9.4 8.6 Z" />
  </svg>
);

const StarSparkle = ({ size = 24, color = "#0E0E0C" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

const Heart = ({ size = 22, color = "#E63A33", stroke = "#0E0E0C", strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
    <path d="M12 21s-7-4.5-9.5-9c-1.5-2.7 0-6 3-6 2 0 3.5 1.5 4.5 3 1-1.5 2.5-3 4.5-3 3 0 4.5 3.3 3 6C19 16.5 12 21 12 21z"/>
  </svg>
);

const Scribble = ({ size = 60, color = "#0E0E0C", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 30 C 18 10, 30 50, 42 28 S 56 18, 56 18" />
  </svg>
);

const Dot = ({ size = 10, color = "#1B3FE0" }) => (
  <span style={{
    display: "inline-block",
    width: size, height: size, borderRadius: "50%",
    background: color,
  }} />
);

// ---------- Cutout placeholder (image slot styled) ----------
const Cutout = ({ label, c1 = "#FFD9E8", c2 = "#FFC0D6", radius = 16, style = {} }) => (
  <div
    className="ks-cut-ph"
    data-label={label}
    style={{ borderRadius: radius, "--ph-c1": c1, "--ph-c2": c2, ...style }}
  />
);

// ---------- Scatter: place a bunch of decorations randomly ----------
// Deterministic so layout doesn't shift between renders
function seededScatter(seed, count, w, h) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * w,
      y: rand() * h,
      r: (rand() - 0.5) * 60,
      size: 14 + Math.round(rand() * 18),
      kind: rand(),
    });
  }
  return out;
}

const DecorScatter = ({ seed = 7, density = 24, palette = ["yellow","pink","blue","red","mint"], style = {} }) => {
  const items = seededScatter(seed, density, 100, 100); // %
  const colors = {
    yellow: "#FFD23D", pink: "#FF3B86", blue: "#1B3FE0",
    red: "#E63A33", mint: "#6CE6BA", black: "#0E0E0C",
  };
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, ...style }}>
      {items.map((it, i) => {
        const colorKey = palette[i % palette.length];
        const color = colors[colorKey] || colorKey;
        let el = null;
        if (it.kind < 0.28) el = <StarFilled size={it.size} color={color} />;
        else if (it.kind < 0.55) el = <StarOutline size={it.size + 4} color="#0E0E0C" />;
        else if (it.kind < 0.72) el = <StarSparkle size={it.size + 6} color={color} />;
        else if (it.kind < 0.88) el = <Heart size={it.size} color={color} />;
        else el = <Dot size={Math.max(6, it.size / 2)} color={color} />;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${it.x}%`,
              top: `${it.y}%`,
              transform: `translate(-50%, -50%) rotate(${it.r}deg)`,
            }}
          >{el}</span>
        );
      })}
    </div>
  );
};

// ---------- Annotation (hot-pink callout box like leoleocked) ----------
const Annotation = ({ text, x, y, rotate = -2 }) => (
  <span
    className="ks-anno"
    style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${rotate}deg)` }}
  >{text}</span>
);

// Export to window for cross-script access
Object.assign(window, {
  StarFilled, StarOutline, StarSparkle, Heart, Scribble, Dot,
  Cutout, DecorScatter, Annotation,
});
