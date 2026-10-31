import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();

const body = async () => (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 170);

async function snap(name) {
  await page.waitForTimeout(1600);
  try { await page.waitForLoadState("networkidle", { timeout: 10000 }); } catch { /* ignore */ }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  log(`SNAP ${name} URL=${page.url()}`);
  log(`TXT: ${await body()}`);
}

try {
  await page.goto("https://bool.com/apps", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);

  // dismiss any blocking dialogs
  for (let d = 0; d < 4; d++) {
    const dialogOff = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button")).filter((b) => (b.textContent || "").trim() === "No thanks");
      if (btns.length) { btns[0].click(); return "dismiss-nothx"; }
      const close = Array.from(document.querySelectorAll("button")).filter((b) => b.getAttribute("aria-label") === "Close");
      if (close.length) { close[0].click(); return "dismiss-close"; }
      return "none";
    });
    log(`dismiss${d}: ${dialogOff}`);
    if (dialogOff === "none") break;
    await page.waitForTimeout(900);
  }

  // welcome / home page unobstructed
  await page.screenshot({ path: `${OUT}/app-00-home.png`, fullPage: true });
  log("HOME TXT:", await body());

  // sidebar sections with fresh locators after modal removal
  for (const [label, file] of [
    ["Projects", "app-02-projects"],
    ["Drop", "app-03-drop"],
    ["Domains", "app-04-domains"],
    ["Chats", "app-05-chats"],
    ["Agents", "app-06-agents"],
  ]) {
    const item = page.locator(`a, button, [role=button]`).filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }).first();
    if (await item.count()) {
      await item.click({ timeout: 7000 }).catch(() => {});
      await snap(file);
    } else log(`NO_NAV ${label}`);
  }

  // New app hero button → create flow
  const newBtn = page.locator("a, button, [role=button]").filter({ hasText: /new app/i }).first();
  if (await newBtn.count()) {
    await newBtn.click({ timeout: 8000 }).catch(() => {});
    await snap("app-07-create");

    const box = page.locator("textarea:visible, input[placeholder]:visible, [contenteditable=true]:visible").first();
    if (await box.count()) {
      await box.click().catch(() => {});
      await page.keyboard.type("a habit tracker with daily check-ins and streaks", { delay: 18 });
      await page.screenshot({ path: `${OUT}/app-08-create-filled.png`, fullPage: true });
      log("FILLED_IDEA");
    } else log("NO_PROMPT_BOX");
  } else log("NO_NEW_BTN");

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
}

await browser.close();
