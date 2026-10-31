import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  IX, ICopy, IShare, IGift, IUser, ISliders, IBook, INew, IHelp, IBug,
  ISignout, IHome, IUserPlus, ICog, ICrown, IChart, ICheck, IPlus, Avatar,
} from "./ui";

/* ————— click-catcher (transparent full-screen) ————— */
export function VhOverlay({ children, close }: { children: ReactNode; close: () => void }) {
  return (
    <div className="vh-overlay" onClick={close}>
      {children}
    </div>
  );
}

/* ————— Invite friends & earn credits modal (x01) ————— */
export function InviteModal({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="iv-overlay" onClick={close}>
      <div className="iv-modal" onClick={(e) => e.stopPropagation()}>
        {/* left deco: dot grid + doodles */}
        <div className="iv-deco">
          <svg className="ivd" style={{ left: 28, top: 50 }} width="70" height="26" viewBox="0 0 80 26" fill="none">
            <path d="M2 18 C 12 2, 24 2, 32 12 S 56 24, 78 6" stroke="#2f6bff" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <svg className="ivd" style={{ left: 136, top: 26 }} width="22" height="19" viewBox="0 0 22 19" fill="none">
            <path d="M2 10.5 8 16.5 20 2" stroke="#19b98f" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="ivd" style={{ left: 16, top: 190 }} width="12" height="12">
            <rect width="12" height="12" rx="2.5" fill="#8b2fe0" transform="rotate(-16 6 6)" />
          </svg>
          {/* gift */}
          <svg className="ivd" style={{ left: 82, top: 168 }} width="60" height="58" viewBox="0 0 24 23" fill="none" stroke="#2563eb" strokeWidth="1.9">
            <rect x="3" y="8.5" width="18" height="12" rx="1.2" />
            <path d="M2.5 5.5h19v3h-19z" />
            <path d="M12 5.5v15" />
            <path d="M12 5.5S10.8 1 8.4 1 5.6 3.3 5.6 4.2 6.6 5.5 8.2 5.5z" />
            <path d="M12 5.5s1.2-4.5 3.6-4.5 2.8 2.3 2.8 3.2-.9 1.3-2.6 1.3z" />
          </svg>
          <svg className="ivd" style={{ left: 194, top: 146 }} width="8" height="8"><circle cx="4" cy="4" r="4" fill="#2f6bff" /></svg>
          <svg className="ivd" style={{ left: 170, top: 266 }} width="15" height="13" viewBox="0 0 30 28">
            <path d="M15 3 26 24 6 20z" fill="#ff8469" />
          </svg>
          <svg className="ivd" style={{ left: 148, top: 302 }} width="56" height="32" viewBox="0 0 66 40" fill="none">
            <path d="M4 30 C 12 8, 26 4, 34 14 C 40 22, 34 30, 26 28 C 18 26, 22 14, 36 12 C 50 10, 58 22, 62 34" stroke="#ff5a3c" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <svg className="ivd" style={{ left: 38, top: 320 }} width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 5 A 11 11 0 1 0 27 16 C 27 10 22 8 18.5 10.5 C 15 13 17 18 21 17.2" stroke="#8b2fe0" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* body */}
        <div className="iv-body">
          <button className="iv-close" onClick={close} aria-label="Close"><IX size={17} /></button>
          <h2 className="iv-title">Invite friends &amp; earn credits</h2>
          <p className="iv-sub">
            Share your link and earn 15 credits when a friend signs up
            and publishes their first app.
          </p>

          <div className="iv-linkrow">
            <input readOnly value="https://bool.com/?ref=fhizi86r" onFocus={(e) => e.currentTarget.select()} />
            <button
              className="iv-copy"
              onClick={() => { navigator.clipboard?.writeText("https://bool.com/?ref=fhizi86r").catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            >
              {copied ? <ICheck size={14} /> : <ICopy size={14} />} {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="iv-hiw">How it works</div>
          <ul className="iv-steps">
            <li><IShare size={15} /><span>Share your unique referral link with friends</span></li>
            <li><IGift size={15} /><span>They get 30 credits when they sign up</span></li>
            <li><IGift size={15} /><span>You earn 15 credits when they publish their first app</span></li>
            <li><IGift size={15} /><span>You earn 100 more when they upgrade to Plus</span></li>
          </ul>

          <div className="iv-ref">Your Referrals (0)</div>
          <a className="iv-terms" href="#terms" onClick={(e) => e.preventDefault()}>Terms &amp; conditions</a>
        </div>
      </div>
    </div>
  );
}

/* ————— Profile popover (x02) ————— */
export function ProfilePop({ close }: { close: () => void }) {
  const nav = useNavigate();
  const go = (to: string) => { nav(to); close(); };
  return (
    <div className="pp-pop" onClick={(e) => e.stopPropagation()}>
      <div className="pp-head">
        <Avatar size={30} />
        <div className="pp-head-t">
          <span>enchanting-stealer</span>
          <span className="dim">shooter6602@fldubai.com</span>
        </div>
      </div>
      <button className="pp-item on" onClick={close}><IUser size={15} /><span>Profile</span></button>
      <button className="pp-item" onClick={() => go("/app/workspaces/settings/general")}><ISliders size={15} /><span>Settings</span></button>
      <div className="pp-sep" />
      <button className="pp-item" onClick={() => go("/docs")}><IBook size={15} /><span>Documentation</span></button>
      <button className="pp-item" onClick={() => go("/whats-new")}><INew size={15} /><span>What's new</span></button>
      <button className="pp-item" onClick={close}><IHelp size={15} /><span>Help &amp; support</span></button>
      <button className="pp-item" onClick={close}><IBug size={15} /><span>Report a bug</span></button>
      <div className="pp-sep" />
      <button className="pp-item" onClick={() => go("/")}><ISignout size={15} /><span>Sign out</span></button>
    </div>
  );
}

/* ————— Workspace switcher popover (x03) ————— */
export function WsPop({ close, invite }: { close: () => void; invite?: () => void }) {
  const nav = useNavigate();
  const go = (to: string) => { nav(to); close(); };
  return (
    <div className="wp-pop" onClick={(e) => e.stopPropagation()}>
      <div className="wp-head">
        <span className="wp-badge"><IHome size={13} /></span>
        <div className="wp-head-t">
          <span>Personal</span>
          <span className="dim">Free plan</span>
        </div>
      </div>
      <button className="pp-item" onClick={() => (invite ? invite() : close())}><IUserPlus size={15} /><span>Invite members</span></button>
      <button className="pp-item" onClick={() => go("/app/workspaces/settings/general")}><ICog size={15} /><span>Workspace settings</span></button>
      <button className="pp-item" onClick={close}><ICrown size={15} /><span>Upgrade plan</span></button>
      <button className="pp-item" onClick={() => go("/app/settings/usage")}><IChart size={15} /><span>Usage</span></button>
      <div className="wp-sep" />
      <div className="wp-label">Switch workspace</div>
      <div className="pp-item"><IHome size={15} /><span>Personal</span><ICheck size={14} className="wp-check" /></div>
      <button className="pp-item" onClick={close}><IPlus size={15} /><span>Create workspace</span></button>
    </div>
  );
}
