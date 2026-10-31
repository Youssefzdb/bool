import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import {
  BoolMark, Avatar, IMenu, IHome, IGrid, IUpload, IGlobe, IChat, IBot,
  IClock, IGift, IBack, IStar, IArchive, ISwap, ICard, IX, IUpdown,
  IText, ICClaude, ICOpenai, ICGrok, ICGrokBot, ICMCP, ICCLI, ICVSCode,
  ISearch, IPencil, ILink,
} from "./ui";
import { VhOverlay, InviteModal, ProfilePop, WsPop } from "./Overlays";

const MAIN_NAV = [
  { to: "/app", icon: IHome, label: "Home", end: true },
  { to: "/app/projects", icon: IGrid, label: "Projects" },
  { to: "/app/drop", icon: IUpload, label: "Drop" },
  { to: "/app/domains", icon: IGlobe, label: "Domains" },
  { to: "/app/chats", icon: IChat, label: "Chats" },
  { to: "/app/agents", icon: IBot, label: "Agents" },
];

const PROJ_NAV = [
  { to: "/app/projects", icon: IGrid, label: "Projects", end: true },
  { to: "/app/projects/shared", icon: ISwap, label: "Shared with me" },
  { to: "/app/projects/favorites", icon: IStar, label: "Favorites" },
  { to: "/app/projects/archive", icon: IArchive, label: "Archive" },
  { to: "/app/projects/recents", icon: IClock, label: "Recents" },
  { to: "/app/templates", icon: ICard, label: "Templates" },
];

const AGENTS_NAV = [
  { to: "#", icon: IText, label: "Text" },
  { to: "#", icon: ICClaude, label: "Claude" },
  { to: "#", icon: ICOpenai, label: "ChatGPT" },
  { to: "#", icon: ICGrok, label: "Grok" },
  { to: "#", icon: ICGrokBot, label: "Grok Bot" },
  { to: "#", icon: ICClaude, label: "Claude Code" },
  { to: "#", icon: ICOpenai, label: "Codex" },
  { to: "#", icon: ICVSCode, label: "VS Code" },
  { to: "#", icon: ICCLI, label: "Bool CLI" },
  { to: "#", icon: ICMCP, label: "Any MCP client" },
];

const DOMAIN_NAV = [
  { to: "#", icon: ISearch, label: "Domain Search" },
  { to: "#", icon: IGrid, label: "My Domains" },
  { to: "#", icon: ISwap, label: "Transfer a domain" },
  { to: "#", icon: IClock, label: "Order History" },
  { to: "#", icon: ICard, label: "Payment Settings" },
];

function SideRow({
  to,
  icon: Icon,
  label,
  end = false,
}: {
  to: string;
  icon: (s: { size?: number; className?: string }) => JSX.Element;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `ap-row${isActive ? " active" : ""}`}>
      <Icon size={17} />
      <span>{label}</span>
    </NavLink>
  );
}

function WhatsNewCard() {
  return (
    <div className="ap-whatsnew">
      <div className="ap-whatsnew-layers" />
      <div className="ap-whatsnew-card">
        <span className="mono ap-wn-label">WHAT'S NEW · OCT 16</span>
        <button className="ap-wn-x" aria-label="Dismiss"><IX size={11} /></button>
        <div className="ap-wn-title">Text Bool</div>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const { pathname } = useLocation();
  const [ov, setOv] = useState<null | "invite" | "profile" | "ws">(null);
  const close = () => setOv(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOv(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let mode: "main" | "projects" | "agents" | "domains" = "main";
  if (/^\/app\/(projects|templates)/.test(pathname)) mode = "projects";
  else if (/^\/app\/agents/.test(pathname)) mode = "agents";
  else if (/^\/app\/domains/.test(pathname)) mode = "domains";
  else if (/^\/app\/(workspaces|settings)/.test(pathname)) mode = "main";

  return (
    <div className="ap-shell">
      <aside className="ap-side">
        <div className="ap-top">
          <div className="ap-logo-row">
            <NavLink to="/" aria-label="bool home"><BoolMark /></NavLink>
            <button className="ap-icon-btn" aria-label="Toggle Sidebar"><IMenu size={17} /></button>
          </div>

          <button
            className="ap-ws"
            onClick={() => setOv(ov === "ws" ? null : "ws")}
            aria-label="Switch workspace"
          >
            <span className="ap-ws-ic"><IHome size={15} /></span>
            <span className="ap-ws-txt">
              <span>Personal</span>
              <span className={`ap-ws-plan`}>Free plan</span>
            </span>
            <IUpdown size={13} className="ap-ws-swap" />
          </button>
        </div>

        <nav className="ap-nav">
          {mode === "main" && (
            <>
              {MAIN_NAV.map((n) => (
                <SideRow key={n.label} to={n.to} icon={n.icon} label={n.label} end={n.end} />
              ))}
              <div className="ap-side-label">Recents</div>
              <div className="ap-row ap-rec"><IBot size={15} className="ap-rec-ic" /><span>Streak Garden</span></div>
              <div className="ap-row dim"><span>View all projects</span></div>
            </>
          )}

          {mode === "projects" && (
            <>
              <div className="ap-panel-head"><IBack size={16} /><span>Projects</span></div>
              {PROJ_NAV.map((n) => (
                <SideRow key={n.label} to={n.to} icon={n.icon} label={n.label} end={n.end} />
              ))}
            </>
          )}

          {mode === "agents" && (
            <>
              <div className="ap-panel-head"><IBack size={16} /><span>Agents</span></div>
              <div className="ap-row active"><IBot size={16} /><span>Agents home</span></div>
              {AGENTS_NAV.map((n, i) => (
                <div key={i} className="ap-row">
                  <n.icon size={16} />
                  <span>{n.label}</span>
                </div>
              ))}
            </>
          )}

          {mode === "domains" && (
            <>
              <div className="ap-panel-head"><IBack size={16} /><span>Domains</span></div>
              {DOMAIN_NAV.map((n, i) => (
                <div key={i} className={`ap-row${i === 0 ? " active" : ""}`}>
                  <n.icon size={16} />
                  <span>{n.label}</span>
                </div>
              ))}
              <div className="ap-side-label" style={{ marginTop: 14 }}>Domain</div>
              <div className="ap-row spread"><IPencil size={15} /><span>Select a domain</span><IChevD size={14} /></div>
            </>
          )}
        </nav>

        <div className="ap-bottom">
          {mode === "main" && <WhatsNewCard />}
          <Link to="/app/settings/usage" className="ap-row spread">
            <span className="ap-row-l"><ILink size={16} /><span>Credits</span></span>
            <span className="ap-credits-n">28.8 left</span>
          </Link>
          <button className="ap-row" onClick={() => setOv("invite")}><IGift size={16} /><span>Invite friends</span></button>
          <button
            className="ap-user"
            onClick={() => setOv(ov === "profile" ? null : "profile")}
            aria-label="Account menu"
          >
            <Avatar size={26} />
            <span className="ap-user-txt">
              <span className="ap-user-name">enchanting-stealer</span>
              <span className="ap-user-handle">@enchanting-stealer</span>
            </span>
            <span className="ap-dots">···</span>
          </button>
        </div>
      </aside>

      <main className="ap-main">
        <Outlet />
      </main>

      {ov === "invite" && <InviteModal close={close} />}
      {ov === "profile" && (
        <VhOverlay close={close}><ProfilePop close={close} /></VhOverlay>
      )}
      {ov === "ws" && (
        <VhOverlay close={close}><WsPop close={close} invite={() => setOv("invite")} /></VhOverlay>
      )}
    </div>
  );
}

function IChevD({ size }: { size?: number }) {
  return (
    <svg width={size ?? 14} height={size ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
