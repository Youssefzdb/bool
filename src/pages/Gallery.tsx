import { useState } from "react";

// Procedural mock-app covers — small fake UIs drawn with CSS blocks and SVG patterns.
function Cover({ variant, hue }: { variant: string; hue: number }) {
  const c = `hsl(${hue}`;
  if (variant === "rows")
    return (
      <svg viewBox="0 0 200 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="84" fill={`${c} 40% 96%)`} />
        <rect x="12" y="10" width="70" height="7" rx="3" fill={`${c} 30% 65%)`} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="12" y={26 + i * 13} width="176" height="9" rx="4" fill="#fff" />
            <rect x="18" y={29 + i * 13} width={60 + i * 22} height="3.6" rx="1.8" fill={`${c} 45% 74%)`} />
          </g>
        ))}
      </svg>
    );
  if (variant === "kanban")
    return (
      <svg viewBox="0 0 200 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="84" fill={`${c} 40% 94%)`} />
        {[0, 1, 2].map((col) => (
          <g key={col}>
            <rect x={10 + col * 64} y="8" width="52" height="66" rx="5" fill="#fff" />
            <rect x={14 + col * 64} y="14" width="30" height="5" rx="2.5" fill={`${c} 35% 70%)`} />
            {[0, 1, 2].map((r) => (
              <rect key={r} x={14 + col * 64} y={25 + r * 15} width="44" height="10" rx="3" fill={`${c} 55% ${(r % 2 ? 88 : 78) + "%)"} `} />
            ))}
          </g>
        ))}
      </svg>
    );
  if (variant === "chart")
    return (
      <svg viewBox="0 0 200 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="84" fill={`${c} 40% 96%)`} />
        <rect x="12" y="9" width="52" height="6" rx="3" fill={`${c} 30% 62%)`} />
        {[
          "M12 64 40 52 66 58 92 38 118 44 146 26 188 34",
          "M12 70 38 60 70 64 96 50 124 56 152 40 188 48",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={i === 1 ? `${c} 67% 70%)` : `${c} 72% 46%)`} strokeWidth="2.4" strokeLinecap="round" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={40 + i * 54} cy={[52, 38, 26][i]} r="3.4" fill={`${c} 72% 46%)`} />
        ))}
      </svg>
    );
  if (variant === "gallery")
    return (
      <svg viewBox="0 0 200 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="84" fill={`${c} 38% 92%)`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={10 + (i % 3) * 62} y={8 + Math.floor(i / 3) * 40} width="56" height="34" rx="5" fill={`${c} ${30 + (i % 3) * 6}% ${(74 + i * 3) % 88}%)`} />
        ))}
      </svg>
    );
  // form variant
  return (
    <svg viewBox="0 0 200 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="84" fill={`${c} 40% 95%)`} />
      <rect x="12" y="9" width="86" height="8" rx="4" fill={`${c} 30% 60%)`} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="12" y={28 + i * 18} width="120" height="12" rx="4" fill="#fff" />
          <rect x="18" y={32 + i * 18} width={40 + i * 20} height="4" rx="2" fill={`${c} 45% 78%)`} />
        </g>
      ))}
      <rect x="146" y="64" width="42" height="14" rx="7" fill={`${c} 72% 45%)`} />
    </svg>
  );
}

const CATS = [
  "All", "Builds", "Logistics", "Trackers", "Directory", "E-comm", "Weddings", "School", "Local", "Games", "Media",
];

const items = [
  { name: "Wedding RSVP Hub", desc: "Guest list, meal picks, and seating in one page.", v: "form", hue: 8 },
  { name: "Pastry Preorders", desc: "Order forms with a pickup-time picker.", v: "kanban", hue: 34 },
  { name: "Stock Reorder Board", desc: "Flags what's running low and who orders it.", v: "chart", hue: 212 },
  { name: "Podcast Catalog", desc: "Every episode with notes and a search box.", v: "rows", hue: 258 },
  { name: "Team Directory", desc: "Faces, roles, and who is out this week.", v: "gallery", hue: 200 },
  { name: "Used Book Shelf", desc: "Filter titles by price, shelf, and condition.", v: "rows", hue: 148 },
  { name: "Homework Planner", desc: "Due dates, classes, and late work alerts.", v: "kanban", hue: 48 },
  { name: "Puppy Health Log", desc: "Vet visits, meds, and feeding times.", v: "rows", hue: 8 },
  { name: "Job Application Tracker", desc: "Stages from application to the offer call.", v: "form", hue: 26 },
  { name: "City Weekend Planner", desc: "Hours, transits, and bookings in one view.", v: "gallery", hue: 222 },
  { name: "Renovation Budget", desc: "Room-by-room costs with labor included.", v: "chart", hue: 192 },
  { name: "Event Noticeboard", desc: "What's on, when, and how close.", v: "form", hue: 96 },
];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? items : items.filter((_, i) => i % CATS.length === CATS.indexOf(cat));

  return (
    <section className="page-hero" style={{ textAlign: "left" }}>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ maxWidth: "14ch", marginInline: "auto" }}>
            Made with this builder
          </h2>
          <p className="lede" style={{ margin: "14px auto 0", textAlign: "center" }}>
            Sample apps from the crew. Open one as-is or remix it into your own.
          </p>
        </div>

        <div className="chips">
          {CATS.map((c) => (
            <button
              key={c}
              className={`chip-f ${c === cat ? "active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {shown.map((t, i) => (
            <a className="gallery-card" href="#remix" key={`${t.name}-${i}`}>
              <div className="browser-bar">
                <i /><i /><i />
                <span className="bu">{t.name.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <div className="mock-cover">
                <Cover variant={t.v} hue={t.hue} />
              </div>
              <div className="gc-copy">
                <div className="gc-head">
                  <strong>{t.name}</strong>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 17 21 3m-8 0h8v8" />
                  </svg>
                </div>
                <p>{t.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
