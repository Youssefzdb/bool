import { useState } from "react";
import { Link } from "react-router-dom";
import { IClip, IMic, IArrowUp, IChevD, IX, IBot, IGlobe } from "./ui";

const CHIPS = ["Tasks & Workflows", "CRM & Sales", "Content & Sites", "Finance", "Booking"];

function Doodles() {
  return (
    <>
      <svg className="dd dd-bl" width="80" height="26" viewBox="0 0 80 26" fill="none">
        <path d="M2 18 C 12 2, 24 2, 32 12 S 56 24, 78 6" stroke="#2f6bff" strokeWidth="5.5" strokeLinecap="round" />
      </svg>
      <svg className="dd dd-tr1" width="30" height="28" viewBox="0 0 30 28">
        <path d="M15 3 26 24 6 20z" fill="#ff8469" />
      </svg>
      <svg className="dd dd-tr2" width="66" height="40" viewBox="0 0 66 40" fill="none">
        <path d="M4 30 C 12 8, 26 4, 34 14 C 40 22, 34 30, 26 28 C 18 26, 22 14, 36 12 C 50 10, 58 22, 62 34" stroke="#ff5a3c" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <svg className="dd dd-ml" width="86" height="30" viewBox="0 0 86 30" fill="none">
        <path d="M2 22 C 14 4, 30 4, 40 14 S 66 26, 84 10" stroke="#19b98f" strokeWidth="5.5" strokeLinecap="round" />
      </svg>
      <svg className="dd dd-sq" width="12" height="12">
        <rect width="12" height="12" rx="3" fill="#8b2fe0" transform="rotate(-14 6 6)" />
      </svg>
      <svg className="dd dd-dot" width="15" height="15"><circle cx="7.5" cy="7.5" r="7.5" fill="#2f6bff" /></svg>
      <svg className="dd dd-sq2" width="12" height="12">
        <rect width="12" height="12" rx="3" fill="#8b2fe0" transform="rotate(18 6 6)" />
      </svg>
    </>
  );
}

/* mini thumbnail replica of the Streak Garden app */
function Thumb() {
  return (
    <div className="ap-thumb">
      <div className="ap-thumb-bar">
        <span className="ap-thumb-leaf" />
        <span className="ap-thumb-name">Streak Garden</span>
        <span className="ap-thumb-date">Saturday, October 31</span>
      </div>
      <div className="ap-thumb-body">
        <div className="ap-thumb-hero">
          <div className="ap-thumb-caps">YOUR DAILY GROWING LIST</div>
          <div className="ap-thumb-h1">A little, every day.</div>
          <div className="ap-thumb-sub">0/0 habits checked in today</div>
          <div className="ap-thumb-line" />
          <div className="ap-thumb-row">Today's habits</div>
          <div className="ap-thumb-chip">New habit</div>
          <div className="ap-thumb-week">This week</div>
        </div>
        <div className="ap-thumb-foot">Last Saved 1 minute ago</div>
      </div>
      <span className="ap-pub-badge">Published</span>
    </div>
  );
}

export default function Dash() {
  const [tab, setTab] = useState<"recent" | "mine" | "featured">("recent");

  return (
    <div className="ap-page">
      <section className="ap-hero">
        <Doodles />
        <h1 className="ap-h1">What will you build next?</h1>

        <div className="ap-prompt">
          <span className="ap-prompt-clip"><IClip size={16} /></span>
          <input placeholder="What do you want to build?" />
          <div className="ap-prompt-right">
            <button className="ap-modechip">Build <IChevD size={12} /></button>
            <button className="ap-minibtn" aria-label="Record voice input"><IMic size={15} /></button>
            <button className="ap-send" aria-label="Submit"><IArrowUp size={15} /></button>
          </div>
        </div>

        <div className="ap-create-q">What would you like to create?</div>
        <div className="ap-chips">
          {CHIPS.map((c) => (
            <button key={c} className="ap-chip">{c}</button>
          ))}
        </div>
      </section>

      <section className="ap-banner">
        <div>
          <div className="ap-banner-t">Tell us about yourself, get 10 credits</div>
          <div className="ap-banner-s">Four quick questions so Bool fits how you build.</div>
        </div>
        <div className="ap-banner-r">
          <button className="btn-blue btn-sm">Answer now</button>
          <button className="ap-banner-x" aria-label="Dismiss"><IX size={14} /></button>
        </div>
      </section>

      <section className="ap-sect">
        <div className="ap-tabs">
          <button className={tab === "recent" ? "on" : ""} onClick={() => setTab("recent")}>Recent apps</button>
          <button className={tab === "mine" ? "on" : ""} onClick={() => setTab("mine")}>Your templates</button>
          <button className={tab === "featured" ? "on" : ""} onClick={() => setTab("featured")}>Featured templates</button>
        </div>

        {tab === "recent" ? (
          <div className="ap-cards">
            <Link to="/app/editor/streak-garden" className="ap-card">
              <Thumb />
              <div className="ap-card-meta">
                <IBot size={22} className="ap-card-av" />
                <div className="ap-card-title">
                  <span>Streak Garden <IGlobe size={12} /></span>
                  <span className="ap-card-time">1 min ago</span>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <p className="ap-empty-line">
            {tab === "mine" ? "Save a Bool as a template to reuse its setup." : "Templates from the Bool team land here."}
          </p>
        )}
      </section>
    </div>
  );
}
