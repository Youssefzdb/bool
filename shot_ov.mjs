import { chromium } from "playwright-core";
const log = (...a) => console.log(...a);
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const OUT = "/root/bool-clone/shots-clone-app";
const BASE = "http://localhost:4173";

try {
  // c-15 invite modal
  await page.goto(BASE + "/app", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(700);
  await page.locator('button:has-text("Invite friends")').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/c-15-invite-modal.png` });
  log("c-15 OK");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // c-16 profile popover
  await page.locator('button[aria-label="Account menu"]').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/c-16-profile-menu.png` });
  log("c-16 OK");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // c-17 workspace switcher
  await page.locator('button[aria-label="Switch workspace"]').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/c-17-ws-switcher.png` });
  log("c-17 OK");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // c-18 workspace general
  await page.goto(BASE + "/app/workspaces/settings/general", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/c-18-ws-general.png` });
  log("c-18 OK");

  // c-19 404 billing
  await page.goto(BASE + "/app/workspaces/settings/billing", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/c-19-ws-404.png` });
  log("c-19 OK");

  // functional: credits row navigates
  await page.goto(BASE + "/app", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(500);
  await page.locator('a:has-text("Credits")').first().click();
  await page.waitForTimeout(600);
  log("CREDITS NAV:", page.url());
} catch (e) { log("ERR:", (e.message || "").split("\n")[0]); }
await browser.close();
