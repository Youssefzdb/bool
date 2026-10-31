import { IClip, ISearch, IGift, IUpload, IUpdown, IChevD } from "./ui";

export default function DropApp() {
  return (
    <div className="ap-page pad">
      <div className="dp-zone">
        <div className="dp-zone-h">Drag &amp; drop. It's online.</div>
        <div className="dp-zone-s">
          Drop a folder, a zip, or a single HTML file — you get a live link to share in seconds.
        </div>
        <div className="dp-zone-btns">
          <button className="dp-btn"><IUpload size={15} /> Browse files</button>
          <button className="dp-btn"><IClip size={14} /> Choose folder</button>
        </div>
        <svg className="dp-file-float" width="34" height="42" viewBox="0 0 34 42" fill="none">
          <path d="M4 3h18l8 8v28H4z" fill="#fff" stroke="#d8dce4" />
          <path d="M22 3v8h8" fill="#eef1f6" stroke="#d8dce4" />
          <rect x="7" y="22" width="20" height="11" rx="2" fill="#ffb11c" />
          <text x="17" y="30.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">ZIP</text>
        </svg>
        <span className="dp-cursor">Leo</span>
      </div>

      <div className="dp-gh">
        <span className="dp-or">or import from GitHub</span>
        <div className="dp-gh-row">
          <label className="dp-gh-input">
            <ISearch size={15} />
            <input placeholder="https://github.com/owner/repo" />
          </label>
          <button className="dp-import"><IGift size={0} /><IUpdown size={14} /> Import</button>
        </div>
      </div>

      <div className="dp-meta">
        <div className="dp-meta-row">
          <span className="dp-k">Drops into</span>
          <button className="dp-v">Personal (Personal) <IChevD size={12} /></button>
        </div>
        <div className="dp-meta-row">
          <span className="dp-k">Visible to</span>
          <button className="dp-v">Anyone with the link <IChevD size={12} /></button>
        </div>
        <div className="dp-note">Saved as your default for next time.</div>
      </div>

      <p className="dp-foot">
        No account needed · Drop again on your link's page to publish new versions at the same URL
      </p>
      <p className="dp-foot dim">Up to 10 MB per drop, 10 MB per file, 1,000 files.</p>
    </div>
  );
}
