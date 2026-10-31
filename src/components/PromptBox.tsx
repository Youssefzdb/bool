import { useReducer, useState } from "react";

type State = { phase: "idle" | "building" | "done"; url: string | null };
type Action = { type: "submit" } | { type: "finish"; url: string };

function reducer(_s: State, action: Action): State {
  switch (action.type) {
    case "submit":
      return { phase: "building", url: null };
    case "finish":
      return { phase: "done", url: action.url };
  }
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join("-")
      .slice(0, 32) || "my-app"
  );
}

export default function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [state, dispatch] = useReducer(reducer, { phase: "idle", url: null });

  function submit() {
    if (!prompt.trim() || state.phase !== "idle") return;
    dispatch({ type: "submit" });
    setTimeout(
      () => dispatch({ type: "finish", url: `https://${slugify(prompt)}.bool-clone.app` }),
      1300,
    );
  }

  const building = state.phase === "building";

  return (
    <div className="prompt-box">
      <div className="prompt-row">
        <input
          value={prompt}
          placeholder="What do you want to build?"
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button
          className="prompt-go"
          onClick={submit}
          disabled={building || !prompt.trim()}
          aria-label="Build"
        >
          {building ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {state.phase === "done" && state.url && (
        <div className="prompt-result" role="status">
          <span className="pulse" />
          <a href={state.url}>{state.url}</a>
          <span className="mono pr-note">built in 46s (demo)</span>
        </div>
      )}
    </div>
  );
}
