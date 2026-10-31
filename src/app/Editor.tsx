import React, { useState } from "react";
import {
  IShare, IPalette, IHistory, IKbd, IMonitor, IPencil, IThumbUp, ICopy, IX, IQR,
  IMic, IClip, IChevR, IChevD, ILeaf, ICheck, IUpload, ICard,
  ISearch, IStar, ICode, IApi, IGlobe, IDatabase, ICollab, IPublish,
  IUsers, IAnalytics, ISiteTools, ISLogs, ISFiles, ISecrets, IGrid,
} from "./ui";

/* squiggle time divider */
function Divider({ time }: { time: string }) {
  return (
    <div className="ed-div">
      <svg width="90" height="10" viewBox="0 0 90 10" fill="none"><path d="M1 5 C 8 0, 14 10, 22 5 S 38 0, 45 5 S 60 10, 68 5 S 82 0, 89 5" stroke="var(--border)" strokeWidth="1.4" /></svg>
      <span className="ed-div-t">{time}</span>
      <svg width="90" height="10" viewBox="0 0 90 10" fill="none"><path d="M1 5 C 8 0, 14 10, 22 5 S 38 0, 45 5 S 60 10, 68 5 S 82 0, 89 5" stroke="var(--border)" strokeWidth="1.4" /></svg>
    </div>
  );
}

/* ————— Streak Garden preview replica ————— */
function StreakGarden() {
  return (
    <div className="sg">
      <div className="sg-top">
        <span className="sg-leaf"><ILeaf size={15} /></span>
        <span className="sg-name">Streak Garden</span>
        <span className="sg-date mono">Saturday, October 31</span>
      </div>
      <div className="sg-body">
        <div className="sg-hero">
          <div className="sg-caps mono">YOUR DAILY GROWING LIST</div>
          <div className="sg-h1">A little, every day.</div>
          <div className="sg-sub">Saturday, October 31</div>
          <div className="sg-count"><b>0</b>/<b>0</b> <span className="sg-count-l">habits checked in today</span></div>
          <div className="sg-bar"><span /></div>
        </div>
        <div className="sg-sec">
          <div>
            <div className="sg-sec-l">Today's habits</div>
            <div className="sg-sec-d">Saturday, October 31</div>
          </div>
          <button className="sg-btn sm">+ New habit</button>
        </div>
        <div className="sg-empty">
          <span className="sg-empty-ic"><ILeaf size={18} /></span>
          <div className="sg-empty-t">Start your garden</div>
          <div className="sg-empty-s">Add one small habit you'd like to return to each day.</div>
          <button className="sg-btn">+ Add your first habit</button>
        </div>
        <div className="sg-week">
          <div>
            <div className="sg-week-t">This week</div>
            <div className="sg-week-s">Check-ins, Monday to Sunday</div>
          </div>
          <div className="sg-week-n"><b>0</b><span>TOTAL</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Editor() {
  const [view, setView] = useState<"preview" | "dashboard">("preview");
  const [dlg, setDlg] = useState<null | "share" | "history" | "publish">(null);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDlg(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="ed">
      {/* ——— chat column ——— */}
      <div className="ed-chat">
        <header className="ed-chat-h">
          <span className="ed-app-ic" />
          <span className="ed-app-name">Streak Ga...</span>
          <span className="ed-chat-h-r">
            <button aria-label="Export"><IUpload size={16} /></button>
            <button aria-label="Theme" onClick={() => setDlg("publish")}><IPalette size={16} /></button>
            <button aria-label="History" onClick={() => setDlg("history")}><IHistory size={16} /></button>
          </span>
        </header>

        <div className="ed-msgs">
          <Divider time="4:39 PM" />
          <div className="ed-user-bubble">a habit tracker with daily check-ins, streaks and a weekly chart</div>

          <div className="ed-ai">
            <p>
              I'll build <b>Streak Garden</b> as a ready-to-use habit tracker: daily check-ins, current
              streaks, and a clear weekly progress chart. Your habits and check-ins will be saved so
              your progress is still there when you return.
            </p>
            <div className="ed-worked">
              <IChevR size={13} /> <span>Worked for 30s</span>
            </div>
            <p>
              Your tracker will open straight to this week's habits, with one-tap check-ins and streak
              counts beside each one. I'm giving it a crisp garden-journal look and a weekly chart that
              fills in as you check in.
            </p>
            <div className="ed-worked green">
              <IChevR size={13} /> <span>Worked</span> <b className="mono">+632</b>
            </div>
            <div className="ed-react">
              <button aria-label="Good response"><IThumbUp size={14} /></button>
              <button aria-label="Copy"><ICopy size={14} /></button>
            </div>
          </div>
        </div>

        <div className="ed-input">
          <div className="ed-input-brand">
            <svg width="44" height="16" viewBox="0 0 86 30"><circle cx="16.5" cy="20" r="6" fill="#2f6bff" /><circle cx="33" cy="18.5" r="7.6" stroke="#8b2fe0" strokeWidth="7" fill="none" /><circle cx="53" cy="18.5" r="7.6" stroke="#19b98f" strokeWidth="7" fill="none" /><rect x="66" y="1.5" width="7" height="26" rx="3.5" fill="#ff4d2e" /></svg>
            <span className="ed-input-getting">Getting started</span>
            <span className="ed-progress" />
          </div>
          <div className="ap-prompt ed-prompt">
            <span className="ap-prompt-clip"><IClip size={16} /></span>
            <input placeholder="Ask Bool to change anything..." />
            <button className="ap-minibtn" aria-label="Record voice input"><IMic size={15} /></button>
            <button className="ap-send stop" aria-label="Stop"><IX size={13} /></button>
          </div>
        </div>
      </div>

      {/* ——— preview pane ——— */}
      <div className="ed-pane">
        <header className="ed-pane-h">
          <span className="ed-kb"><IKbd size={15} /></span>
          <div className="ed-views">
            <button className={view === "preview" ? "on" : ""} onClick={() => setView("preview")}>Preview</button>
            <button className={view === "dashboard" ? "on" : ""} onClick={() => setView("dashboard")}>Dashboard</button>
          </div>
          <span className="ed-pane-h-r">
            <button className="ap-mini-ghost" aria-label="Share" onClick={() => setDlg("share")}><IShare size={15} /></button>
            <button className="btn-blue sm publish" onClick={() => setDlg("publish")}>Publish</button>
          </span>
        </header>

        {view === "preview" ? (
          <>
            <div className="ed-chrome">
              <span className="ed-edit"><IPencil size={14} /> Edit</span>
              <span className="ed-urlbar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.5 6" /><path d="M4 18v-4h4" /></svg>
                Home
                <span className="ed-dot" />
              </span>
              <button className="ap-mini-ghost" aria-label="Overlays"><IMonitor size={15} /></button>
            </div>
            <div className="ed-stage">
              <StreakGarden />
            </div>
          </>
        ) : (
          <DashboardView />
        )}
      </div>

      {/* ——— dialogs ——— */}
      {dlg === "share" && <ShareDlg close={() => setDlg(null)} />}
      {dlg === "history" && <HistoryDlg close={() => setDlg(null)} />}
      {dlg === "publish" && <PublishPop close={() => setDlg(null)} />}
    </div>
  );
}

/* right pane > Dashboard tab (app settings) */
function DashboardView() {
  const NAV: { icon: (s: { size?: number }) => JSX.Element; label: string; section?: string }[] = [
    { icon: IGrid, label: "Overview" },
    { icon: ICode, label: "Code", section: "CONTENT" },
    { icon: IDatabase, label: "Data" },
    { icon: IUpload, label: "Drop" },
    { icon: ICollab, label: "Collaboration", section: "SHARING & ACCESS" },
    { icon: IPublish, label: "Publishing" },
    { icon: IGlobe, label: "Domains" },
    { icon: IUsers, label: "Users" },
    { icon: IAnalytics, label: "Analytics" },
    { icon: IApi, label: "API", section: "DEVELOPER" },
    { icon: ISiteTools, label: "Site tools" },
    { icon: ISLogs, label: "Logs" },
    { icon: ISFiles, label: "Files" },
    { icon: ISecrets, label: "Secrets" },
  ];

  return (
    <div className="ed-dash">
      <aside className="ed-dash-nav">
        <label className="ap-search ed-dash-search">
          <ISearch size={13} />
          <input placeholder="Search settings..." />
        </label>
        {NAV.map((n, i) => (
          <div key={n.label}>
            {n.section && <div className="ed-dash-sec mono">{n.section}</div>}
            <div className={`ed-dash-row${i === 0 ? " on" : ""}`}>
              <n.icon size={15} /> <span>{n.label}</span>
            </div>
          </div>
        ))}
      </aside>
      <div className="ed-dash-body">
        <div className="ed-dash-title-row">
          <div>
            <div className="ed-dash-name-row">
              <span className="ed-app-ic lg" />
              <span className="ed-dash-name">Streak Garden</span>
            </div>
            <p className="ed-dash-desc">Check in on daily habits, build streaks, and see your progress in a weekly chart.</p>
            <p className="ed-dash-created mono">Created 4 min ago</p>
          </div>
          <IStar size={17} className="ed-dash-star" />
        </div>
        <div className="ed-dash-actions">
          <button><ICheck size={13} /> Open App</button>
          <button><ICard size={13} /> Save as template</button>
          <button><IShare size={13} /> Share</button>
          <button><IUpload size={13} /> Update via Drop</button>
        </div>
        <div className="ed-dash-card">
          <div className="ed-dash-card-t">App Visibility</div>
          <div className="ed-dash-card-s">Control who can access your application</div>
          <div className="ed-dash-select">Public <IChevD size={13} /></div>
        </div>
        <div className="ed-dash-card">
          <div className="ed-dash-card-t">Invite Users</div>
          <div className="ed-dash-card-s">Grow your user base by inviting others</div>
          <div className="ed-dash-btns">
            <button className="ghost">Copy Link</button>
            <button className="blue">Send Invites</button>
          </div>
          <div className="ed-dash-warn">Collaborators use credits from this workspace.</div>
        </div>
        <div className="ed-dash-cols">
          <div className="ed-dash-card sm2">
            <div className="ed-dash-card-t row"><IGlobe size={13} /> Public URL</div>
            <a className="ed-dash-url" href="#">https://streak-garden-7adr…</a>
          </div>
          <div className="ed-dash-card sm2">
            <div className="ed-dash-card-t row"><ICard size={13} /> Database</div>
            <div className="ed-dash-db">2 tables</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareDlg({ close }: { close: () => void }) {
  return (
    <div className="ed-overlay" onClick={close}>
      <div className="ed-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="ed-dlg-h">
          <span className="ed-dlg-t">Share <span className="dim">· Streak Garden</span></span>
          <button onClick={close} aria-label="Close"><IX size={16} /></button>
        </header>
        <div className="ed-dlg-access">
          <span className="dim">Your access</span>
          <span className="ed-owner">Owner</span>
        </div>
        <div className="ed-dlg-sec">People with access</div>
        <div className="ed-invite-row">
          <input placeholder="Add people or groups..." />
          <select defaultValue="edit"><option value="edit">Can edit</option><option>Can view</option></select>
          <button className="blue sm">Invite</button>
        </div>
        <div className="ed-dlg-warn">Collaborators use credits from this Bool's workspace.</div>
        <div className="ed-owner-row">
          <svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3aa9f0" /><circle cx="8.6" cy="10" r="1.7" fill="#101014" /><circle cx="15.4" cy="10" r="1.7" fill="#101014" /><path d="M8.5 15a4.4 4.4 0 0 0 7 0" stroke="#101014" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
          <div className="ed-owner-txt">
            <span>enchanting-stealer</span>
            <span className="dim">shooter6602@fldubai.com</span>
          </div>
          <span className="dim">You</span>
        </div>
        <div className="ed-dlg-sec">Published app</div>
        <div className="ed-dlg-note">Choose the broadest audience that can use the app. People above can have more access.</div>
        <div className="ed-dlg-aud">
          <span>🌐 Anyone with the link — Can use</span>
        </div>
        <div className="ed-dlg-live">
          <span className="mono">streak-garden-7adr.bool.so</span>
          <span className="ed-live">● LIVE</span>
        </div>
        <div className="ed-dlg-aud spread">
          <span className="row"><IQR size={15} /> Scan to open on a phone</span>
          <IChevD size={14} />
        </div>
        <footer className="ed-dlg-f">
          <button className="linkblue">Copy live link</button>
          <button className="blue" onClick={close}>Done</button>
        </footer>
      </div>
    </div>
  );
}

function HistoryDlg({ close }: { close: () => void }) {
  return (
    <div className="ed-chat-panel" role="dialog">
      <header className="ed-hp-h">
        <button onClick={close} aria-label="Back">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>
        </button>
        <span className="ed-hp-t">Version History</span>
      </header>
      <p className="ed-hp-sub">Click a version to preview it. Use the menu to restore or publish.</p>
      <div className="ed-ver">
        <span className="ed-ver-l" />
        <div className="ed-ver-t">
          <span className="ed-ver-name">Daily Habit Tracker With Streaks</span>
          <span className="ed-ver-badge">● Live</span>
          <IChevD size={13} className="ed-ver-more" />
        </div>
        <span className="ed-ver-time mono">just now</span>
      </div>
      <div className="ed-ver start">
        <span className="ed-ver-l start" />
        <div className="ed-ver-t">
          <span className="ed-ver-name">Starting point</span>
          <IChevD size={13} className="ed-ver-more" />
        </div>
        <span className="ed-ver-time mono">4 min ago</span>
      </div>
    </div>
  );
}

function PublishPop({ close }: { close: () => void }) {
  return (
    <div className="ed-pubpop" role="dialog">
      <div className="ed-pub-t">Publish your app</div>
      <div className="ed-pub-s">Put your latest changes online at a public link.</div>
      <div className="ed-pub-k">Your link</div>
      <div className="ed-pub-link">
        <b>streak-garden-7adr</b><span className="dim">.bool.so</span>
      </div>
      <div className="ed-pub-k">Who can see this</div>
      <div className="ed-pub-opt on">
        <span>🌐 <b>Public</b><span className="dim"> — Anyone with the link</span></span>
        <ICheck size={14} />
      </div>
      <div className="ed-pub-opt">
        <span>🔒 <b>Private</b> <span className="ed-pro">PRO</span><span className="dim"> — Only people you invite</span></span>
      </div>
      <div className="ed-pub-auto">
        <span>Publish changes automatically</span>
        <span className="ed-switch on" />
      </div>
      <button className="blue full finish">⟳ Finishing your changes...</button>
      <div className="ed-pub-note">Publishing unlocks when your app is ready</div>
      <button className="ed-pub-close" onClick={close} aria-label="Close"><IX size={14} /></button>
    </div>
  );
}

/* tiny helpers — none; all icons come from ./ui */
