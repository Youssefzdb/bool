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
  await page.goto("https://bool.com/projects", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);
  const dump = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a, button, [role=button]"))
      .filter((el) => el.offsetParent !== null)
      .slice(0, 60)
      .map((el) => `[${el.tagName}${el.getAttribute("href") ? " " + el.getAttribute("href") : ""}] ${(el.textContent || "").trim().slice(0, 24)}`)
  );
  log("DUMP:", dump.slice(0, 50).join("\n"));
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
}
await browser.close();
