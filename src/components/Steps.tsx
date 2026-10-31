// Three pastel cards, each with its own little mock-UI diorama (drawn from scratch).
import { useEffect, useState } from "react";

function MockTyping() {
  const full = "a sign up sheet for the bake sale";
  const [n, setN] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setN((v) => (v < full.length ? v + 1 : 0)), 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mock-type">
      <span className="mock-type-text">{full.slice(0, n)}<i className="caret" /></span>
      <span className="mock-go">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </div>
  );
}

function MockDeploy() {
  return (
    <div className="mock-deploy">
      <span className="mock-url">bake-sale.bool.so</span>
      <span className="mock-status mono">
        <i className="spin" /> Building
      </span>
    </div>
  );
}

function MockAccess() {
  return (
    <div className="mock-access">
      <div className="ma-row">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c3 2.4 3 13.6 0 16M12 4c-3 2.4-3 13.6 0 16" />
        </svg>
        Anyone with the link
      </div>
      <div className="ma-row selected">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="9" cy="9" r="3.4" />
          <path d="M3.5 19c.7-2.8 2.9-4.3 5.5-4.3s4.8 1.5 5.5 4.3M16 8.2a3 3 0 0 1 0 5.6" />
        </svg>
        Everyone at work
      </div>
      <div className="ma-row">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="8.5" cy="14.5" r="3.6" />
          <path d="M11.5 11.8 20 4.5m-3.2 3.2 2.2 2.2" />
        </svg>
        Only people you name
      </div>
    </div>
  );
}

const cards = [
  { cls: "step-card orange", mock: <MockTyping />, num: "01", title: "Say it in plain words", body: "One short sentence is enough — Bool writes the app and the database underneath it." },
  { cls: "step-card blue", mock: <MockDeploy />, num: "02", title: "A real address, instantly", body: "The build finishes with a hosted site on its own URL. Hand the link to anyone." },
  { cls: "step-card violet", mock: <MockAccess />, num: "03", title: "Pick who can open it", body: "Open link, your whole team, or just a named list — you choose the audience." },
];

export default function Steps() {
  return (
    <section className="section steps-section" id="how-it-works">
      <div className="container">
        <h2 className="h2 left">One sentence in, one link out.</h2>

        <div className="steps-grid">
          {cards.map((c) => (
            <div key={c.num} className="step-cell">
              <div className={c.cls}>{c.mock}</div>
              <span className="step-num mono">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
