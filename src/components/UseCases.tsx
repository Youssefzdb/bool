import { useCases } from "../data";

export default function UseCases() {
  return (
    <section className="section madefor-section" id="use-cases">
      <div className="container">
        <h2 className="h2 left">Made for</h2>

        <div className="madefor-rows">
          {useCases.map((u) => (
            <a className="mf-row" href={`#${u.title.toLowerCase().replace(/\s+/g, "-")}`} key={u.title}>
              <h3>{u.title}</h3>
              <p>{u.body}</p>
              <span className="mf-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
