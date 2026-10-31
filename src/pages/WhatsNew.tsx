import PixelArt from "../components/PixelArt";

const ENTRIES = [
  {
    date: "SEP 12 2026",
    title: "Build over text message",
    paragraphs: [
      "Text an idea to your project's number and the builder answers with a link. No keyboard required — the whole chat lives in your messages app.",
      <>Great for fixing a label while you're out, or spinning up a page on someone else's laptop.</>,
    ],
    art: "warm" as const,
    link: "Set up Text Bool",
    tag: "get-started",
  },
  {
    date: "AUG 30 2026",
    title: "Real tables, in every app",
    paragraphs: [
      <>Every project you publish now gets a durable grid view. <b>Edit rows like a spreadsheet</b>, and the app reflects changes on the next load — no mutes, no re-deploys.</>,
      <>Existing apps were backfilled automatically: your tables are already there.</>,
    ],
    art: "cool" as const,
    link: "Explore the data view",
    tag: "data",
  },
  {
    date: "AUG 02 2026",
    title: "Web hooks without rule-plumbing",
    paragraphs: [
      <>Want an action to fire when someone submits a form, or a row turns overdue? <b>Any app can call any endpoint</b> — point a hook at a URL and pick the trigger from a plain-English sentence.</>,
      <>Fan-out patterns and retry behavior ship automatically.</>,
    ],
    art: "warm" as const,
    link: "Connect your first hook",
    tag: "hooks",
  },
  {
    date: "JUL 19 2026",
    title: "Start from a spreadsheet",
    paragraphs: [
      <>Drop a CSV and <b>the columns become the data model</b>. The builder infers types, generates a browsable table, and writes pages on top — most files become a working CRUD app in under a minute.</>,
      <>Upgrades and filtering survive the round-trip.</>,
    ],
    art: "cool" as const,
    link: "See the importer",
    tag: "data",
  },
  {
    date: "Jul 05 2026",
    title: "Invite and earn",
    paragraphs: [
      <>Share your referral link and both sides get <b>bonus build credits</b>. Editors you invite don't need a plan of their own — seats are free on every tier.</>,
    ],
    art: "warm" as const,
    link: "Find your link",
    tag: "billing",
  },
  {
    date: "JUN 21 2026",
    title: "Live co-editing",
    paragraphs: [
      <>Two people, one project, zero conflicts. Crews can chat, edit, and publish <b>together in real time</b> — with per-person checkpoints so nothing gets stepped on.</>,
    ],
    art: "cool" as const,
    link: "Try it with a friend",
    tag: "teams",
  },
];

export default function WhatsNew() {
  return (
    <section style={{ paddingTop: 70 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 46 }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Changelog</p>
          <h2 className="h2" style={{ marginInline: "auto", maxWidth: "18ch" }}>
            What's new
          </h2>
        </div>

        <div className="feed">
          {ENTRIES.map((e) => (
            <article className="feed-entry" key={e.date}>
              <span className="feed-date">{e.date}</span>
              <h3>{e.title}</h3>
              <div className="feed-body">
                {e.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="feed-media">
                <PixelArt variant={e.art} />
              </div>
              <a className="feed-link" href={`#${e.tag}`}>
                {e.link} <span aria-hidden="true">›</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
