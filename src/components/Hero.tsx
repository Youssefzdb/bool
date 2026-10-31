import PixelArt from "./PixelArt";
import PromptBox from "./PromptBox";

export default function Hero() {
  return (
    <section className="hero-wrap" id="main">
      <div className="hero-panel">
        <PixelArt variant="warm" />

        <div className="hero-content">
          <span className="badge">
            <span className="badge-new">New</span>
            <a href="#text-bool">Text Bool</a>
            <span className="badge-arrow">›</span>
          </span>

          <h1>
            The fastest way from idea
            <br />
            to live app.
          </h1>

          <p className="hero-sub">
            Bool is an AI app builder that turns a prompt into real, hosted
            software. Describe it, tweak it, and it's on the web in under a
            minute.
          </p>

          <PromptBox />

          <div className="hero-cta">
            <a className="btn btn-dark" href="#get-started">
              Start building
            </a>
            <a className="btn btn-white" href="#signin">
              Sign in
            </a>
          </div>

          <div className="assistant-pill">
            <span className="ap-dots" aria-hidden="true">
              <i style={{ background: "#ff8fb2" }} />
              <i style={{ background: "#3ecfb2" }} />
              <i style={{ background: "#7aa9ff" }} />
              <i style={{ background: "#ffb84d" }} />
            </span>
            Build from Claude, ChatGPT, Cursor, and 25 more
          </div>
        </div>
      </div>
    </section>
  );
}
