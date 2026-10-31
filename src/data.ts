export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Drop", href: "#drop" },
  { label: "Use cases", href: "#use-cases", dropdown: true },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "What's new", href: "#whats-new" },
];

export const steps = [
  {
    num: "01",
    title: "Say what you want",
    body: "A single plain-English sentence. Bool writes the app and wires up the database behind it.",
  },
  {
    num: "02",
    title: "A real address of its own",
    body: "You get a hosted website the instant the build finishes. Pass the link to anyone.",
  },
  {
    num: "03",
    title: "Choose who gets in",
    body: "Open to anyone with the link, restricted to your team, or locked to a list you name.",
  },
];

export const featureList = [
  {
    icon: "db",
    title: "Data and files",
    body: "Each app ships with its own database and file storage. Open it up and edit the rows by hand.",
    span: 2,
  },
  {
    icon: "key",
    title: "Sign in for your users",
    body: "Accounts for everyone who uses your app, with zero configuration on your side.",
    span: 2,
  },
  {
    icon: "spark",
    title: "AI inside your app",
    body: "Summaries, chat, tagging — just ask for them in plain words. No API key required.",
    span: 2,
  },
  {
    icon: "undo",
    title: "Undo anything",
    body: "Every edit creates a checkpoint. Jump back to any version and publish when it feels right.",
    span: 3,
  },
  {
    icon: "users",
    title: "Build it together",
    body: "Invite collaborators by email and edit side by side. Editors don't need a plan.",
    span: 3,
  },
];

export const useCases = [
  {
    title: "Personal software",
    body: "Describe the tool you need, use it today, and keep it to yourself.",
    href: "#personal",
  },
  {
    title: "Prototypes",
    body: "Real data, one link, updated between meetings.",
    href: "#prototypes",
  },
  {
    title: "Internal software",
    body: "Admin panels, queues, and dashboards your team signs into — up in minutes.",
    href: "#internal",
  },
  {
    title: "Private websites",
    body: "Sites that sit on the open web but stay invisible to everyone you didn't add.",
    href: "#private",
  },
  {
    title: "Organize your apps",
    body: "Folders, sharing, and permissions that behave like your files already do.",
    href: "#organize",
  },
];

export const starterPrompt = `Build me a web app called "Task Board".

Requirements:
- A board with three columns: To do, Doing, Done
- I can add, edit, and drag tasks between columns
- Tasks have a title, an optional description, and a due date
- Save everything in a database so it persists
- Clean dark UI, minimal chrome
- Deploy it and give me a public link`;
