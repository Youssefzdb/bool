import { chromium } from "playwright-core";
const log = (...a) => console.log(...a);
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const BASE = "http://localhost:4173";
try {
  await page.goto(BASE + "/app/editor/streak-garden", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(600);

  // share dialog directly (no popover in between)
  await page.locator('[aria-label="Share"]').first().click({ timeout: 6000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/root/bool-clone/shots-clone-app/c-13-share-dlg.png" });
  log("c-13 OK");

  // history panel
  await page.keyboard.press("Escape");
  await page.locator('[aria-label="History"]').first().click({ timeout: 6000 });
  await page.waitForTimeout(450);
  await page.screenshot({ path: "/root/bool-clone/shots-clone-app/c-14-history.png" });
  log("c-14 OK");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
}
await browser.close();
