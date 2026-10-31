import { featureList } from "../data";

const iconStroke: Record<string, string> = {
  db: "M5 6c0-1.4 3.1-2.5 7-2.5S19 4.6 19 6v3c0 1.4-3.1 2.5-7 2.5S5 10.4 5 9V6Zm0 4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5m-14 4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V8.5",
  key: "M14.5 9.5 21 3m-3.2 3.2 2.4 2.4M8.5 15.5 15 9m-9.7 8.5A4.1 4.1 0 1 0 11.5 17 4.1 4.1 0 0 0 5.3 17.5Zm3.2-2.3m-1.6 1.6Z",
  spark: "M12 3l2 5.6L19.6 10l-5.6 2-2 5.6-2-5.6L4.4 12l5.6-1.4L12 3Z",
  undo: "M8.5 5.5 4.5 9.5l4 4M4.5 9.5H14a5.5 5.5 0 1 1 0 11H8",
  users: "M9.5 8.6a3.3 3.3 0 1 1-6.6 0 3.3 3.3 0 0 1 6.6 0Zm-6 11c.6-2.9 2.7-4.5 5.4-4.5s4.8 1.6 5.4 4.5m2.5-11.2a3 3 0 0 1 0 5.8m2.3 5.4c-.3-2.2-1.3-3.6-3-4.3",
};

function CellIcon({ name }: { name: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={iconStroke[name]} />
    </svg>
  );
}

export default function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <h2 className="h2 left">
          Everything an app
          <br />
          needs is already there.
        </h2>

        <div className="features-panel">
          {featureList.map((f) => (
            <article className="f-cell" key={f.title}>
              <span className="f-cell-pattern" aria-hidden="true" />
              <span className="f-icon">
                <CellIcon name={f.icon} />
              </span>
              <div className="f-copy">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </article>
          ))}

          <a className="f-cell f-cta" href="#start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 17 21 3m-8 0h8v8" />
            </svg>
            <span>Start with one sentence</span>
          </a>
        </div>
      </div>
    </section>
  );
}
