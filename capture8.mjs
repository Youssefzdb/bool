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
  // warm up on dashboard first (session refresh)
  await page.goto("https://bool.com/dashboard", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3200);
  await page.goto("https://bool.com/workspaces/personal-ahc1ldnmh2cx/settings/instructions", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  const t1 = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  log("TXT1:", t1.slice(0, 300));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  const t2 = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  log("TXT2:", t2.slice(0, 300));
  await page.screenshot({ path: "/root/bool-clone/shots-auth/x08-instructions.png", fullPage: true });
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
} catch (e) { log("ERR:", (e.message || "").split("\n")[0]); }
await browser.close();
