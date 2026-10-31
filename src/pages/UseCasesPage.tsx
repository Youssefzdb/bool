import { useState } from "react";

const MESS = [
  { tag: "shared pass", url: "refund-sheet.git-main.vercel.app", owner: "Priya's account", top: 6, left: 4, rot: -7 },
  { tag: "link in Slack", url: "docs.google.com/spreadsheets/…", owner: "Sam's Drive", top: 34, left: 5, rot: 3 },
  { tag: "no sign-in", url: "oncall-log.fly.dev", owner: "Marcus's account", top: 40, left: 48, rot: 5 },
  { tag: "emailed twice", url: "budget-model-FINAL2.xlsx", owner: "email attachment", top: 16, left: 46, rot: -4 },
  { tag: "anyone with link", url: "notes site.acme/hiring-v3", owner: "Dana's workspace", top: 70, left: 26, rot: -3 },
  { tag: "open on Lee's laptop", url: "localhast:3000", owner: "Lee's laptop", top: 76, left: 60, rot: 4 },
  { tag: "public", url: "kpi-dash-final2.vercel.app", owner: "Sam's account", top: 45, left: 72, rot: 6 },
  { tag: "no sign-in", url: "release-checklist.vercel.app", owner: "Marcus's account", top: 82, left: 78, rot: -6 },
];

const BUILDS = [
  { name: "Personal software", desc: "Describe the tool. Use it today. Nobody else has to know." },
  { name: "Prototypes", desc: "Real data, one link, replaced between meetings." },
  { name: "Internal software", desc: "Admin panels, queues, and dashboards your team signs into — that in minutes." },
  { name: "Private websites", desc: "Web lists on the web and invisible to everyone you didn't add." },
  { name: "Organize your apps", desc: "Folders, sharing, and permissions that work the way your files already do." },
];

const NAVY = {
  byCategory: ["Productivity", "Education", "Entertainment", "Health & Wellness", "E-commerce & Retail", "Finance"],
  byRole: ["Product Marketing", "Business Intelligence & Analytics", "Marketing & Sales Automation", "HR & Recruiting", "Dev & Productivity", "Operations"],
};

export default function UseCasesPage() {
  const [idea, setIdea] = useState("");

  return (
    <>
      <section className="uc-intro">
        <h1>The home for the software you make</h1>
        <p className="uc-sub">
          Write it in chat. File it,
          <br />
          share it, keep it on lock like a real file.
        </p>
        <div className="uc-box">
          <textarea
            placeholder=""
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="uc-send" aria-label="Send">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 19V5m-6 6 6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="uc-blue">
        <div className="container uc-blue-inner">
          <h2>Where do your apps live today?</h2>
          <p className="uc-lede">
            Someone's account, someone's laptop, a link buried in chat. The
            clone gives them one place to live.
          </p>
          <div className="mess">
            {MESS.map((m) => (
              <div
                className="mess-card"
                key={m.url}
                style={{ top: `${m.top}%`, left: `${m.left}%`, transform: `rotate(${m.rot}deg)` }}
              >
                <span className="mess-tag">{m.tag}</span>
                <b style={{ fontFamily: "var(--font-mono)" }}>{m.url.split("/")[0]}</b>
                <span className="mess-url">{m.url}</span>
                <span className="mess-owner">{m.owner}</span>
              </div>
            ))}
            <span className="click-hint">click the mess</span>
          </div>
        </div>
      </section>

      <section className="uc-plain">
        <div className="container">
          <h2>What people build</h2>
          <div className="uc-grid">
            {BUILDS.map((b) => (
              <article className="uc-card" key={b.name}>
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-navy">
        <div className="container">
          <h2>More ways to start</h2>
          <div className="uc-navy-grid">
            <div>
              <h4>By category</h4>
              <ul>
                {NAVY.byCategory.map((c) => (
                  <li key={c}>
                    <a href="#category">{c}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>By role</h4>
              <ul>
                {NAVY.byRole.map((r) => (
                  <li key={r}>
                    <a href="#role">{r}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="uc-final">
        <h2>Build it in the next minute</h2>
        <a className="btn btn-blue" href="#get-started">
          Start building free →
        </a>
      </section>
    </>
  );
}
