import { chromium } from "playwright-core";
const log = (...a) => console.log(...a);
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const page = await ctx.newPage();
try {
  const resp = await page.goto("https://bool.com/apps", { waitUntil: "commit", timeout: 60000 });
  log("STATUS:", resp?.status());
  await page.waitForTimeout(5000);
  log("URL:", page.url());
  const ready = await page.evaluate(() => document.readyState);
  log("READY:", ready);
  const app = await page.locator("text=Toggle Sidebar").first();
  log("SIDEBAR_VISIBLE:", await app.count());
  const dump = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href], button"))
      .filter((el) => (el.offsetWidth || 0) > 0)
      .slice(0, 60)
      .map((el) => `${el.tagName} ${(el.getAttribute("href") || "").slice(0, 24)} | ${(el.textContent || "").trim().slice(0, 24)} @${Math.round(el.getBoundingClientRect().x)},${Math.round(el.getBoundingClientRect().y)}`)
  );
  log("DUMP:", JSON.stringify(dump.slice(0, 45), null, 1));
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  const t = await page.locator("body").innerText().catch(() => "NO_BODY");
  log("BODY:", String(t).replace(/\s+/g, " ").slice(0, 300));
}
await browser.close();
