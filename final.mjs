import { chromium } from "playwright-core";
const log = (...a) => console.log(...a);
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"] });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const page = await ctx.newPage();
const t = async () => (await page.locator("body").innerText()).replace(/\s+/g, " ");
try {
  for (const [r, f] of [["/dashboard", "app-30-dashboard-recents"], ["/projects", "app-31-projects-filled"]]) {
    await page.goto("https://bool.com" + r, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3500);
    await page.evaluate(() => Array.from(document.querySelectorAll("button")).filter((b) => (b.textContent || "").trim() === "No thanks").forEach((b) => b.click()));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `/root/bool-clone/shots-auth/${f}.png`, fullPage: true });
    log(f, "::", (await t()).slice(0, 240));
  }
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("OK");
} catch (e) { log("ERR:", (e.message || "").split("\n")[0]); }
await browser.close();
