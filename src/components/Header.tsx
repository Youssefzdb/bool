import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Drop", to: "/drop" },
  { label: "Use cases", to: "/use-cases", caret: true },
  { label: "Gallery", to: "/gallery" },
  { label: "Pricing", to: "/pricing" },
  { label: "Domains", to: "#domains" },
  { label: "Docs", to: "/docs" },
  { label: "What's new", to: "/whats-new" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "light");

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" aria-label="Home" className="header-logo">
          <Logo />
        </Link>

        <nav className="nav-pill" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive && l.to !== "#domains" ? "nav-item active" : "nav-item"
              }
              onClick={(e) => {
                if (l.to.startsWith("#")) e.preventDefault();
                setOpen(false);
              }}
            >
              {l.label}
              {l.caret && <span className="nav-caret">⌄</span>}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="btn btn-outline btn-sm" href="#signin">
            Sign in
          </a>
          <Link className="btn btn-dark" to="/app">
            Go to dashboard
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className={pathname === l.to ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link to="#signin" onClick={() => setOpen(false)}>
          Sign in
        </Link>
        <Link to="#get-started" onClick={() => setOpen(false)}>
          <b>Get started</b>
        </Link>
      </nav>
    </header>
  );
}
