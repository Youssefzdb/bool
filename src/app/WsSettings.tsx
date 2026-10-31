import { useState } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import {
  ISGeneral, ISBilling, ISMembers, ISInstr, ISUsage,
  ISmiley, IUpload, IUpdown,
} from "./ui";

export const WS_NAV = [
  { icon: ISGeneral, label: "General", to: "/app/workspaces/settings/general" },
  { icon: ISBilling, label: "Billing", to: "/app/workspaces/settings/billing" },
  { icon: ISMembers, label: "Members", to: "/app/workspaces/settings/members" },
  { icon: ISInstr, label: "Instructions", to: "/app/workspaces/settings/instructions" },
  { icon: ISUsage, label: "Usage", to: "/app/settings/usage" },
];

export default function WsSettings() {
  const { tab } = useParams();
  if (tab === "general") return <General />;
  if (tab === "usage") return <Navigate to="/app/settings/usage" replace />;
  return <Ws404 />;
}

/* ————— General tab (app-14) ————— */
function General() {
  const [name, setName] = useState("Personal");
  const dirty = name !== "Personal";

  return (
    <div className="ap-page pad">
      <header className="ap-page-head">
        <div>
          <h1 className="ap-title">Workspace settings</h1>
          <p className="ap-sub">Manage Personal, its members, and billing.</p>
        </div>
        <button className="us-ws-btn">
          <span className="us-ws-badge">P</span> Personal <IUpdown size={12} />
        </button>
      </header>

      <div className="us-grid">
        <aside className="us-nav">
          {WS_NAV.map((n) => (
            <Link key={n.label} to={n.to} className={`us-nav-row${n.label === "General" ? " on" : ""}`}>
              <n.icon size={16} />
              <span>{n.label}</span>
            </Link>
          ))}
        </aside>

        <div className="ws-gen-card">
          <h2 className="ws-gen-h2">General</h2>
          <div className="ws-gen-sub">Workspace identity.</div>

          <div className="ws-icon-row">
            <span className="ws-icon-badge">P</span>
            <span className="ws-icon-label">Workspace icon</span>
            <span className="ws-icon-btns">
              <button className="ws-icon-btn"><ISmiley size={14} /> Emoji</button>
              <button className="ws-icon-btn"><IUpload size={14} /> Upload</button>
            </span>
          </div>

          <div className="ws-name-label">Workspace name</div>
          <input className="ws-name-input" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="ws-save" disabled={!dirty}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

/* ————— 404 (billing / members / instructions / anything else) ————— */
const CROWD: { l: number; t: number; s: number; o: number; e: string }[] = [
  { l: 334, t: 142, s: 28, o: 1, e: "🤷🏻‍♂️" },
  { l: 418, t: 122, s: 20, o: 0.55, e: "🤷🏻‍♂️" },
  { l: 360, t: 200, s: 32, o: 1, e: "🤷‍♂️" },
  { l: 460, t: 185, s: 26, o: 1, e: "🤷🏽‍♀️" },
  { l: 417, t: 254, s: 30, o: 1, e: "🤷🏿‍♂️" },
  { l: 478, t: 337, s: 26, o: 0.95, e: "🤷🏿‍♀️" },
  { l: 520, t: 347, s: 18, o: 0.8, e: "🤷‍♀️" },
  { l: 494, t: 376, s: 24, o: 0.95, e: "🤷🏽‍♀️" },
  { l: 254, t: 372, s: 16, o: 0.4, e: "🤷🏻‍♀️" },
];

export function Ws404() {
  const nav = useNavigate();
  return (
    <div className="ap-page wsnf">
      <div className="wsnf-crowd">
        {CROWD.map((c, i) => (
          <span key={i} className="wsnf-emo" style={{ left: c.l, top: c.t, fontSize: c.s, opacity: c.o }}>{c.e}</span>
        ))}
      </div>
      <div className="wsnf-big">404</div>
      <p className="wsnf-sub">Nobody knows where this one went.</p>
      <div className="wsnf-btns">
        <button className="btn-blue wsnf-blue" onClick={() => nav("/app")}>Go home</button>
        <button className="wsnf-ghost" onClick={() => nav("/whats-new")}>What's new</button>
      </div>
    </div>
  );
}
