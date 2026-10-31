import { Link } from "react-router-dom";
import { LogoWord, LogoMark } from "./Logo";

const socials = [
  { label: "X", d: "M17.8 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.6L4.9 21H1.8l7.4-8.5L2 3h6.6l4.5 6L17.8 3Z" },
  {
    label: "Instagram",
    d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4 8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Zm13.2-1.4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  },
  { label: "TikTok", d: "M16.5 3c.4 2.1 1.8 3.6 4 3.9v3.1c-1.5 0-2.9-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8-3.2 0-5.6-2.4-5.6-5.5 0-3 2.4-5.5 5.6-5.5.3 0 .7 0 1 .1v3.3a2.4 2.4 0 0 0-3.6 2.1c0 1.4 1.1 2.4 2.6 2.4 1.6 0 2.9-1.2 2.9-3V3h3Z" },
  { label: "Reddit", d: "M12 7.6c3.2 0 5.9 2 5.9 4.5 0 2.4-2.7 4.5-5.9 4.5s-5.9-2-5.9-4.5c0-2.4 2.7-4.5 5.9-4.5Zm-2.4 3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm4.8 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8ZM9.6 13.9c1.5.9 3.3.9 4.8 0l.7.9c-1.9 1.3-4.3 1.3-6.2 0l.7-.9ZM17 5.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM12 3.4l1 2.4 2.9 1.2-.7 1.1-2.7-1-2.7 1-.7-1.1 2.7-1.2.5-2.4Z" },
];

const pageLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "What's new", href: "/whats-new" },
  { label: "Humans", href: "#humans" },
  { label: "Brand", href: "#brand" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Support", href: "#support" },
];

export default function FooterMinimal() {
  return (
    <footer className="footer-minimal">
      <div className="container footer-minimal-inner">
        <span className="fm-copy">
          <LogoMark size={16} />
          <LogoWord size={13} />
          <span>© 2026</span>
        </span>

        <nav className="fm-links">
          {pageLinks.map((l) => (
            <Link key={l.label} to={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="fm-social">
          <span className="fm-follow">Follow us</span>
          {socials.map((s) => (
            <a key={s.label} href={`#${s.label.toLowerCase()}`} aria-label={s.label}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
