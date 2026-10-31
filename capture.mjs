import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();

async function body() {
  return (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 160);
}
async function snap(name) {
  await page.waitForTimeout(1800);
  try {
    await page.waitForLoadState("networkidle", { timeout: 12000 });
  } catch { /* keep going */ }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  log(`SNAP ${name} URL=${page.url()}`);
  log(`TXT: ${await body()}`);
}

function navItem(label) {
  return page.locator(`button:has-text("${label}"), a:has-text("${label}")`).first();
}

try {
  await page.goto("https://bool.com/apps", { waitUntil: "networkidle", timeout: 45000 });
  await snap("app-01-dashboard");

  // sidebar sections
  for (const [label, file] of [
    ["Projects", "app-02-projects"],
    ["Drop", "app-03-drop"],
    ["Domains", "app-04-domains"],
    ["Chats", "app-05-chats"],
    ["Agents", "app-06-agents"],
  ]) {
    const item = navItem(label);
    if (await item.count()) {
      await item.click({ timeout: 6000 }).catch(() => {});
      await snap(file);
    } else log(`NO_NAV ${label}`);
  }

  // New project flow
  const newBtn = page.locator('button:has-text("New"), a:has-text("New"), [data-slot*="new"]').first();
  if (await newBtn.count()) {
    await newBtn.click({ timeout: 8000 }).catch(() => {});
    await snap("app-07-create");

    // fill the create prompt if present
    const box = page.locator("textarea:visible, input[placeholder*=describe i]:visible, [contenteditable=true]:visible").first();
    if (await box.count()) {
      await box.click().catch(() => {});
      await page.keyboard.type("a habit tracker with daily check-ins and streaks", { delay: 20 });
      await page.screenshot({ path: `${OUT}/app-08-create-filled.png`, fullPage: true });
      log("FILLED_IDEA");
    } else log("NO_PROMPT_BOX");
  }

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
}

await browser.close();
