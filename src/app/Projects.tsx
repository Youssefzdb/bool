import { useSearchParams, useParams, Link } from "react-router-dom";
import { IPlus, ISearch, IUpdown, IList, ICheckSquare, IGrid } from "./ui";

const TITLES: Record<string, string> = {
  projects: "Projects",
  shared: "Shared with me",
  favorites: "Favorites",
  archive: "Archive",
  recents: "Recents",
  templates: "Templates",
};

const EMPTY: Record<string, { t: string; lines: string[] }> = {
  projects: {
    t: "No projects yet",
    lines: ["Your own Bools will appear here.", "Build one from the home page."],
  },
  shared: {
    t: "Nothing shared yet",
    lines: ["Bools other people share with you", "will show up here."],
  },
  favorites: {
    t: "No favorites yet",
    lines: ["Star a Bool and it will show up here."],
  },
  archive: {
    t: "Archive is empty",
    lines: ["Archived Bools are kept here in case you need them again."],
  },
  recents: {
    t: "No recents",
    lines: ["Bools you open land here."],
  },
  templates: {
    t: "No templates yet",
    lines: ["Save a Bool as a personal template to reuse", "its setup as a starting point for new Bools."],
  },
};

export default function Projects() {
  const [sp] = useSearchParams();
  const { tab: tabParam } = useParams();
  const tab = (tabParam && TITLES[tabParam] ? tabParam : sp.get("tab")) ?? "projects";
  const isTpl = tab === "templates";
  const empty = EMPTY[tab] ?? EMPTY.projects;

  return (
    <div className="ap-page pad">
      <header className="ap-page-head">
        <h1 className="ap-title">
          {TITLES[tab]} <span className="ap-title-n">0</span>
        </h1>
        {!isTpl && (
          <button className="btn-blue ap-newbtn">
            <IPlus size={15} /> New Bool <span className="ap-new-sep">|</span> <IChevDown />
          </button>
        )}
      </header>

      <div className="ap-toolbar">
        <label className="ap-search">
          <ISearch size={15} />
          <input placeholder={isTpl ? "Search templates..." : "Search projects"} />
          {!isTpl && <kbd className="mono">/</kbd>}
        </label>
        <div className="ap-toolbar-r">
          <button className="ap-sort">{isTpl ? "Last edited" : "Last opened"} <IUpdown size={11} className="ap-sort-inv" /></button>
          <div className="ap-views">
            {isTpl ? (
              <>
                <button className="on"><ICheckSquare size={13} /></button>
                <button><IList size={13} /></button>
                <button><IGrid size={13} /></button>
              </>
            ) : (
              <>
                <button className="on"><IGrid size={13} /></button>
                <button><IList size={13} /></button>
                <button><ICheckSquare size={13} /></button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ap-empty">
        <div className="ap-empty-t">{empty.t}</div>
        {empty.lines.map((l) => (
          <div key={l} className="ap-empty-l">{l}</div>
        ))}
        {tab === "projects" && (
          <Link to="/app" className="ap-empty-btn">Start building</Link>
        )}
      </div>
    </div>
  );
}

function IChevDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
  );
}
