import {
  IText, ICClaude, ICOpenai, ICGrok, ICGrokBot, ICVSCode, ICCLI, ICMCP, IBot,
} from "./ui";

type Card = {
  icon: (s: { size?: number; className?: string }) => JSX.Element;
  cls: string;
  t: string;
  s: string;
};

const CARDS: Card[] = [
  { icon: IText, cls: "", t: "Text", s: "iMessage and SMS" },
  { icon: ICClaude, cls: "claude", t: "Claude", s: "Desktop and web" },
  { icon: ICOpenai, cls: "", t: "ChatGPT", s: "Desktop and web" },
  { icon: ICGrok, cls: "", t: "Grok", s: "Custom connector on grok.com" },
  { icon: ICGrokBot, cls: "", t: "Grok Bot", s: "An agent with a cloud computer" },
  { icon: ICClaude, cls: "claude", t: "Claude Code", s: "In your terminal" },
  { icon: ICOpenai, cls: "", t: "Codex", s: "In your terminal" },
  { icon: IBot, cls: "cursor", t: "Cursor", s: "One-click install" },
  { icon: ICVSCode, cls: "", t: "VS Code", s: "Copilot agent mode" },
  { icon: ICCLI, cls: "", t: "Bool CLI", s: "Build locally, publish from the shell" },
  { icon: ICMCP, cls: "", t: "Any MCP client", s: "URL, transport, token" },
];

export default function Agents() {
  return (
    <div className="ap-page pad">
      <header className="ap-page-head no-mb">
        <h1 className="ap-title">Agents</h1>
        <p className="ap-sub">Build Bools from wherever you already work.</p>
      </header>

      <div className="ag-grid">
        {CARDS.map((c) => (
          <button key={c.t} className="ag-card">
            <span className={`ag-ic ${c.cls}`}><c.icon size={18} /></span>
            <span className="ag-txt">
              <span className="ag-t">{c.t}</span>
              <span className="ag-s">{c.s}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
