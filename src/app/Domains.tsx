import { BoolMark, ISearch } from "./ui";

export default function Domains() {
  return (
    <div className="ap-page dom">
      <div className="dom-brand">
        <BoolMark scale={1.6} />
        <span className="dom-word">domains</span>
      </div>

      <label className="dom-search">
        <ISearch size={17} />
        <input placeholder="Search a domain or describe your idea" />
      </label>

      <p className="dom-sub">Search across every TLD — buy and connect without leaving your Bool.</p>
    </div>
  );
}
