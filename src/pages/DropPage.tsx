import { useCallback, useState } from "react";

type Item = { name: string; size: string; kind: string };

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function kindOf(name: string): string {
  if (name.endsWith(".zip")) return "zip";
  if (name.endsWith(".html")) return "html";
  if (!name.includes(".")) return "folder";
  return "file";
}

export default function DropPage() {
  const [dragging, setDragging] = useState(false);
  const [links, setLinks] = useState<Item[]>([]);
  const [repo, setRepo] = useState("");

  const addFiles = useCallback((list: File[]) => {
    setLinks((prev) => [
      ...prev,
      ...list.map((f) => ({ name: f.name, size: formatSize(f.size), kind: kindOf(f.name) })),
    ]);
  }, []);

  return (
    <>
      <section className="drop-hero">
        <div
          className={`drop-panel ${dragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const list = Array.from(e.dataTransfer.files);
            if (list.length) addFiles(list);
          }}
        >
          <div className="di-file" aria-hidden="true">
            <div style={{ position: "relative" }}>
              <span className="zip-badge" style={{ display: "grid", placeItems: "center", background: "#fff" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff7a1a" strokeWidth="1.6">
                  <rect x="4.5" y="3.5" width="15" height="17" rx="1.6" />
                  <path d="M12 6v2m0 2v2m0 2v2" strokeDasharray="0.1 3.8" />
                  <path d="M9.5 18.5h5" />
                </svg>
              </span>
              <svg className="di-cursor" width="16" height="16" viewBox="0 0 24 24" fill="#101014">
                <path d="M5 3l14 8-6.5 1.5L15 19l-3 1.5L9.5 13z" />
              </svg>
            </div>
            <span className="zi-tag">Leo</span>
          </div>

          <div className="drop-inner">
            <h1>
              Drag &amp; drop.
              <br />
              It's online.
            </h1>
            <p>Drop a folder, a zip, or a single HTML file — you get a live link to share in seconds.</p>

            <div className="drop-actions">
              <label className="btn" style={{ cursor: "pointer" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M12 15V4.5M7.5 9 12 4.5 16.5 9" />
                </svg>
                Browse
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => {
                    const list = Array.from(e.target.files ?? []);
                    if (list.length) addFiles(list);
                  }}
                />
              </label>
              <label className="btn" style={{ cursor: "pointer" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.6l2 2.5H19A1.5 1.5 0 0 1 20.5 9v9A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18V6.5Z" />
                </svg>
                Choose folder
                <input
                  type="file"
                  multiple
                  hidden
                  // @ts-expect-error non-standard folder picking attribute
                  webkitdirectory=""
                  onChange={(e) => {
                    const list = Array.from(e.target.files ?? []);
                    if (list.length) addFiles(list);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="drop-import">
        <div className="di-divider">or use your repo</div>
        <div className="di-row">
          <input
            className="di-input"
            placeholder="https://github.com/owner/repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <button className="di-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.3 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.3C22 6.6 17.7 2 12 2Z" />
            </svg>
            Import
          </button>
        </div>

        <div className="drop-caps">
          <span>
            No account needed · {links.length > 0 ? `${links.length} item(s) staged for this demo` : "Drop again on your link's page to publish new versions at the same URL"}.
          </span>

          <span>Up to 10 MB per drop, 10 MB per file, 1,000 files.</span>
        </div>

        {links.length > 0 && (
          <div className="dropped-list">
            {links.map((f, i) => (
              <div className="dropped-item" key={`${f.name}-${i}`}>
                <span className="mono">{f.kind}</span>
                <strong>{f.name}</strong>
                <span className="dropped-size">{f.size}</span>
                <a className="dropped-link" href="#go">
                  → live link
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
