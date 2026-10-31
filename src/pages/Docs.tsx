import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

const NAV = [
  "Introduction",
  "First project",
  "Chat & checkpoints",
  "Files and code",
  "Database",
  "AI in your app",
  "Publishing",
  "Sharing and access",
  "Remixing templates",
  "Workspaces",
  "Billing",
];

const SUBDOMAINS = ["Overview", "Cloudfare", "GoDaddy", "Namecheap", "Porkbun", "NameSilos", "Hew Hallo"];

const GUIDES: [string, string][] = [
  ["First project", "create your first app and put it online"],
  ["Chat & checkpoints", "talking to the builder, rolling back bad edits"],
  ["Files and code", "the file tree, the editor, and version history"],
  ["Database", "look inside and edit your app's records"],
  ["AI in your app", "AI features for your app's visitors, no API key"],
  ["Publishing", "go live, choose who sees your work"],
  ["Sharing and access", "invite people to edit or view"],
  ["Remixing templates", "copy an existing app as a starting point"],
  ["Workspaces", "keep your projects organized"],
  ["Billing", "plans, credits, and what happens at zero"],
  ["Custom domains", "point a domain you own at a published app"],
  ["Sign-in for your app's users", "add accounts to the app you're building"],
  ["Analytics", "who visits your published app, and where they click"],
  ["Logs", "what your app did, request by request"],
  ["SDK reference", "the complete code API for developers"],
  ["HTTP API", "script everything with a personal token"],
];

export default function Docs() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="docs-shell">
      <header className="docs-header">
        <Link to="/" className="docs-word">
          <Logo size={20} />
          <span>Docs</span>
        </Link>

        <div className="docs-search">
          <span>Search documentation…</span>
          <span className="kbd">CTRL K</span>
        </div>

        <div className="docs-auth">
          <a className="log" href="#login">
            Log in
          </a>
          <a className="btn btn-blue btn-sm" href="#signup">
            Sign up
          </a>
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-side">
          {NAV.map((n, i) => (
            <a key={n} href={`#${n.toLowerCase().replace(/[^a-z]+/g, "-")}`} className={i === 0 ? "on" : ""}>
              {n}
            </a>
          ))}
          <div className="docs-cat">Custom domains</div>
          <div className="docs-sub">
            {SUBDOMAINS.map((s) => (
              <a key={s} href="#domain">
                {s}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 18 }} className="docs-sub">
            <a href="#system">⚙ System</a>
          </div>
        </aside>

        <main className="docs-main">
          <span className="docs-crumb">Introduction</span>
          <button className="copy-page" onClick={() => setCopied(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
            </svg>
            {copied ? "Copied!" : "Copy page"}
            <span style={{ color: "var(--fg-faint)" }}>⌄</span>
          </button>

          <h1>Docs</h1>
          <p className="docs-lede">
            Bool is an AI app builder. Describe what you want in a chat and it
            writes the app, sets up the database, and gives you a live preview —
            publish with one click when you're ready.
          </p>

          <h2 className="guides-title">Guides</h2>
          <ul>
            {GUIDES.map(([title, blurb]) => (
              <li key={title}>
                <a href={`#${title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{title}</a> — {blurb}
              </li>
            ))}
          </ul>

          <p className="docs-updated">Last updated on October 28, 2026</p>
          <div className="docs-next">
            <a href="#first-project">
              First project <span>›</span>
            </a>
          </div>
        </main>

        <aside className="docs-toc">
          <h4>On this page</h4>
          <div className="toc-item">Guides</div>
          <hr />
          <a className="toc-fb" href="#feedback">
            Question? Give us feedback ↗
          </a>
          <a className="toc-fb" href="#edit">
            Edit this page ↗
          </a>
        </aside>
      </div>

      <footer className="docs-footer">
        <div className="docs-footer-inner">
          <span className="fm-copy" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--fg-muted)" }}>
            <Logo size={13} />
            <span>© 2026</span>
          </span>
          <nav className="fm-links">
            <a href="https://bool.so">bool.com</a>
            <Link to="/pricing">Pricing</Link>
            <Link to="/whats-new">What's new</Link>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </nav>
          <span style={{ display: "inline-flex", color: "var(--fg-faint)", fontSize: 13 }}>
            Follow
          </span>
        </div>
      </footer>
    </div>
  );
}
