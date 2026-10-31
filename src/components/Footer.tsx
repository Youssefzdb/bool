import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Drop", href: "/drop" },
      { label: "Text Bool", href: "#text-bool" },
      { label: "Gallery", href: "/gallery" },
      { label: "What's new", href: "/whats-new" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Personal software", href: "/use-cases" },
      { label: "Prototypes", href: "/use-cases" },
      { label: "Internal software", href: "/use-cases" },
      { label: "Private websites", href: "/use-cases" },
      { label: "Organize your apps", href: "/use-cases" },
      { label: "All use cases", href: "/use-cases" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Build from your AI", href: "/#build-from-your-ai" },
      { label: "Support", href: "#support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Humans of Bool", href: "#humans" },
      { label: "Brand", href: "#brand" },
      { label: "Contact", href: "mailto:hello@example.com" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer-panel">
      <div className="footer-card">
        <div className="footer-brand">
          <Logo size={24} />
          <div className="footer-socials">
            {["x", "instagram", "tiktok", "reddit"].map((s) => (
              <a key={s} href={`#${s}`} aria-label={s}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  {s === "x" && <path d="M17.8 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.6L4.9 21H1.8l7.4-8.5L2 3h6.6l4.5 6L17.8 3Z" />}
                  {s === "instagram" && (
                    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4 8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Zm13.2-1.4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                  )}
                  {s === "tiktok" && <path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3.1c-1.5 0-2.9-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8-3.2 0-5.6-2.4-5.6-5.5 0-3 2.4-5.5 5.6-5.5.3 0 .7 0 1 .1v3.3a2.4 2.4 0 0 0-3.6 2.1c0 1.4 1.1 2.4 2.6 2.4 1.6 0 2.9-1.2 2.9-3V3h3Z" />}
                  {s === "reddit" && <path d="M12 7.6c3.2 0 5.9 2 5.9 4.5 0 2.4-2.7 4.5-5.9 4.5s-5.9-2-5.9-4.5c0-2.4 2.7-4.5 5.9-4.5Zm-2.4 3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm4.8 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8ZM9.6 13.9c1.5.9 3.3.9 4.8 0l.7.9c-1.9 1.3-4.3 1.3-6.2 0l.7-.9Z" />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((c) => (
          <div className="footer-col" key={c.title}>
            <h4>{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="footer-note" style={{ gridColumn: "1 / -1", margin: "14px 0 0", fontSize: 12, color: "var(--fg-faint)" }}>
          Educational rebuild for learning purposes — not affiliated with Bool.
        </p>
      </div>
    </footer>
  );
}
