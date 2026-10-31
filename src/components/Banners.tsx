// Statement banner, dual paste cards and the closing pixel CTA.
import PixelArt from "./PixelArt";

export function Statement() {
  return (
    <section className="statement-section">
      <div className="container">
        <p className="statement">
          You bring the idea. Bool writes the code, sets up the data, and gives
          it a live link.
        </p>
      </div>
    </section>
  );
}

export function DualCards() {
  return (
    <section className="section dual-section">
      <div className="container dual-grid">
        <div className="paste-card" id="build-from-your-ai">
          <div className="pc-copy">
            <h3>Build from your AI</h3>
            <p>
              Paste one prompt into Claude, ChatGPT, or Cursor — or set it up
              yourself on the starter page.
            </p>
          </div>
          <a className="btn btn-dark btn-sm" href="#copy-prompt">
            Copy prompt
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
            </svg>
          </a>
        </div>

        <div className="paste-card">
          <div className="pc-copy">
            <h3>Drop in your files</h3>
            <p>
              A folder, a zip, or one HTML file becomes a live link in seconds.
              No account needed.
            </p>
          </div>
          <a className="btn btn-dark btn-sm" href="#drop">
            Open Drop
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="section cta-section" id="get-started">
      <div className="cta-panel">
        <PixelArt variant="cool" />
        <div className="cta-content">
          <h2>What will you build?</h2>
          <p>Free to start, no card needed.</p>
          <div className="hero-cta">
            <a className="btn btn-dark" href="#signup">
              Start building
            </a>
            <a className="btn btn-white" href="#signin">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
