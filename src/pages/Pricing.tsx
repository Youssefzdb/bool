import { useState } from "react";

type Tier = {
  name: string;
  price: number;
  blurb: string;
  cta: string;
  featured?: boolean;
  credits?: number[];
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: 0,
    blurb: "Everything you need to launch your first idea.",
    cta: "Start free",
    features: [
      "20 build credits each month",
      "3 live projects",
      "Public share links",
      "Databases included",
      "File drops up to 10MB",
      "Invite collaborators",
    ],
  },
  {
    name: "Solo",
    price: 15,
    blurb: "For indie builders shipping a few projects a month.",
    cta: "Get Solo",
    featured: true,
    credits: [150, 300, 500],
    features: [
      "Everything in Starter",
      "Unlimited projects",
      "Private projects & access control",
      "Bring your own domain",
      "Remove the clone badge",
      "30-day checkpoint history",
    ],
  },
  {
    name: "Team",
    price: 60,
    blurb: "Shared capacity and roles for the whole crew.",
    cta: "Get Team",
    credits: [600, 1200, 2500],
    features: [
      "Everything in Solo",
      "Unlimited seats",
      "Pooled credits",
      "Roles & permissions",
      "Workspace-level sharing",
      "Centralized billing",
    ],
  },
];

export default function Pricing() {
  const [picks, setPicks] = useState<Record<string, number>>({});

  function pick(tier: string, value: number) {
    setPicks((p) => ({ ...p, [tier]: value }));
  }

  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Pricing</p>
        <h2 className="h2">Start free, grow when you need to.</h2>
        <p className="lede">
          Simple credit-based plans. Build for nothing, unlock more capacity
          and team features as you scale.
        </p>

        <div className="tiers">
          {TIERS.map((t) => (
            <article className={`tier ${t.featured ? "tier-featured" : ""}`} key={t.name}>
              <div className="tier-head">
                <h3>{t.name}</h3>
                {t.featured && <span className="tier-pop">☆ Most popular</span>}
              </div>
              <p className="tier-blurb">{t.blurb}</p>

              <div className="tier-price-row">
                <p className="tier-price" style={{ margin: 0 }}>
                  <strong>${t.price}</strong>
                  <span className="mono"> / month</span>
                </p>
                {t.credits && (
                  <span className="credits-select">
                    <select
                      aria-label={`${t.name} credits`}
                      value={picks[t.name] ?? t.credits[0]}
                      onChange={(e) => pick(t.name, Number(e.target.value))}
                      style={{
                        all: "unset",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12.5px",
                        pointerEvents: "auto",
                      }}
                    >
                      {t.credits.map((c) => (
                        <option key={c} value={c}>
                          {c} credits
                        </option>
                      ))}
                    </select>
                    <span>⌄</span>
                  </span>
                )}
              </div>

              <p className="tier-note">
                {t.featured
                  ? "Credits cover builds and everything your published apps run."
                  : "No card required. Cancel any time."}
              </p>

              <a className={`btn ${t.featured ? "btn-blue" : "btn-outline"}`} href="#checkout">
                {t.cta}
              </a>

              <ul className="tier-list">
                {t.features.map((f) => (
                  <li key={f}>
                    <span className="tick">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="stats-strip">
          <div>
            <p className="stat-label">START FREE</p>
            <p className="stat-val">20 <span className="mono">/ mo</span></p>
            <p>
              Every account gets 20 build credits a month — enough to ship
              your first project with no card.
            </p>
          </div>
          <div>
            <p className="stat-label">SHARE LINKS</p>
            <p className="stat-val">Included</p>
            <p>
              Every project gets its own live subdomain. No setup, no signing
              up your audience.
            </p>
          </div>
          <div>
            <p className="stat-label">CREDITS ROLL OVER</p>
            <p className="stat-val">1 month</p>
            <p>
              Unused paid credits carry into one more billing cycle instead of
              vanishing.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="faq">
          <h3>Frequently asked questions</h3>
          <div className="faq-box">
            <details>
              <summary>What counts as a credit? <span className="faq-plus">+</span></summary>
              <p>One credit covers a build request or a chat turn that writes code. Preview refreshes and static file hosting are free.</p>
            </details>
            <details>
              <summary>Do credits roll over month to month? <span className="faq-plus">+</span></summary>
              <p>Paid credits carry into the next cycle for one month. Free-tier credits reset on the same date each month.</p>
            </details>
            <details>
              <summary>Can I change my credit amount later? <span className="faq-plus">+</span></summary>
              <p>Any time — move up or down between cycles. Changes apply at the next renewal.</p>
            </details>
            <details>
              <summary>What happens when I run out of credits? <span className="faq-plus">+</span></summary>
              <p>Published apps stay online. New builds pause until your next allocation or a top-up.</p>
            </details>
            <details>
              <summary>How do team credits work? <span className="faq-plus">+</span></summary>
              <p>Everyone in the workspace draws from one shared pool. Admins assign roles and see usage per member.</p>
            </details>
            <details>
              <summary>Can I cancel anytime? <span className="faq-plus">+</span></summary>
              <p>Yes, from billing settings. Paid features turn off at the end of the cycle and projects return to free capacity.</p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
