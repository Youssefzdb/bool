import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IChart, IUsers, ICard, IUpdown, ISmiley } from "./ui";
import { WS_NAV } from "./WsSettings";

const PERIODS = ["Current period", "7 days", "30 days", "90 days", "All time"];

const STATS = [
  { k: "TURNS", big: "0", sub: "Credits consumed", icon: IChart },
  { k: "ACTIVE MEMBERS", big: "0 / 1", sub: "With activity", icon: IUsers },
  { k: "PROJECTS", big: "0", sub: "All time", icon: ICard },
  { k: "DEPLOYMENTS", big: "0", sub: "Published apps", icon: ISmiley },
  { k: "MESSAGES", big: "0", sub: "LLM steps total", icon: IChart },
];

export default function Usage() {
  const [p, setP] = useState("30 days");
  const loc = useLocation();

  return (
    <div className="ap-page pad us">
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
            <Link key={n.label} to={n.to} className={`us-nav-row${loc.pathname === n.to ? " on" : ""}`}>
              <n.icon size={16} />
              <span>{n.label}</span>
            </Link>
          ))}
        </aside>

        <div className="us-body">
          <div className="us-head-row">
            <div>
              <h2 className="us-h2">Usage</h2>
              <div className="us-range">Oct 1 – Oct 31</div>
            </div>
            <div className="us-periods">
              {PERIODS.map((x) => (
                <button key={x} className={x === p ? "on" : ""} onClick={() => setP(x)}>{x}</button>
              ))}
            </div>
          </div>

          <div className="us-stats">
            {STATS.map((s) => (
              <div key={s.k} className="us-stat">
                <div className="us-stat-k">
                  <span className="mono">{s.k}</span>
                  <s.icon size={14} className="us-stat-ic" />
                </div>
                <div className="us-stat-big">{s.big}</div>
                <div className="us-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="us-card">
            <h3 className="us-card-t">Daily activity</h3>
            <div className="us-card-s">Total turns per day</div>
            <div className="us-noact">No activity in this period.</div>
          </div>

          <div className="us-card">
            <h3 className="us-card-t">Member breakdown</h3>
            <div className="us-card-s">Click column headers to sort. Projects and deployments reflect all-time totals.</div>
            <table className="us-table">
              <thead>
                <tr>
                  <th>MEMBER</th><th>ROLE</th><th>TURNS ↓</th><th>PROJECTS</th><th>DEPLOYS</th><th>LAST ACTIVE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="us-member">
                      <span className="us-dot" />
                      <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3aa9f0" /><circle cx="8.6" cy="10" r="1.7" fill="#101014" /><circle cx="15.4" cy="10" r="1.7" fill="#101014" /><path d="M8.5 15a4.4 4.4 0 0 0 7 0" stroke="#101014" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
                      <div className="us-member-t">
                        <span className="us-member-n">@enchanting-stealer</span>
                        <span className="us-member-e">shooter6602@fldubai.com</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="us-role">admin</span></td>
                  <td>0</td><td>0</td><td>0</td><td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
