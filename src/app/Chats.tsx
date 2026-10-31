import { useState } from "react";
import { IPlus, IMic, IArrowUp, ISearch } from "./ui";

const SUGGESTIONS = [
  "What changed in my bools this week?",
  "Which bools aren't published?",
  "Plan a new bool with me",
];

export default function Chats() {
  const [q, setQ] = useState("");
  const [idea, setIdea] = useState("");

  return (
    <div className="ap-page chatspad">
      <h1 className="ap-title chat-t">Chats</h1>

      <div className="ap-prompt chat-prompt">
        <input
          placeholder="Ask about any of your bools, or start a new one"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <div className="ap-prompt-bottom">
          <button className="ap-addbool">
            <IPlus size={14} /> Add a bool
          </button>
          <div className="ap-prompt-right">
            <button className="ap-minibtn" aria-label="Record voice input"><IMic size={15} /></button>
            <button className="ap-send" aria-label="Submit"><IArrowUp size={15} /></button>
          </div>
        </div>
      </div>

      <div className="ap-chat-chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="ap-chip sm" onClick={() => setQ(s)}>{s}</button>
        ))}
      </div>
      {q && <p className="ap-chat-echo">Searching: “{q}”</p>}

      <div className="ap-chat-filters">
        <div className="ap-ctabs">
          <button className="pira on">All</button>
          <button className="api">Waiting for you</button>
          <button className="api">Starred</button>
        </div>
        <label className="ap-search chatsearch">
          <ISearch size={14} />
          <input placeholder="Search chats" />
        </label>
      </div>

      <div className="ap-nochats">No chats yet</div>
    </div>
  );
}
