import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-clone-app";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const BASE = "http://localhost:4173";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

async function snap(route, file, extra) {
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 });
  } catch { /* SPA is fine */ }
  await page.waitForTimeout(700);
  if (extra) await extra();
  await page.screenshot({ path: `${OUT}/${file}.png`, fullPage: route !== "/app/editor/streak-garden" });
  log("SNAP", file);
}

await snap("/app", "c-01-dash");
await snap("/app/projects", "c-02-projects");
await snap("/app/projects/shared", "c-03-projects-shared");
await snap("/app/templates", "c-04-templates");
await snap("/app/chats", "c-05-chats");
await snap("/app/drop", "c-06-drop");
await snap("/app/domains", "c-07-domains");
await snap("/app/agents", "c-08-agents");
await snap("/app/settings/usage", "c-09-usage");
await snap("/app/editor/streak-garden", "c-10-editor-preview");

// editor: dashboard tab + dialogs
try {
  await page.goto(BASE + "/app/editor/streak-garden", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Dashboard" }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/c-11-editor-dashboard.png` });
  log("SNAP c-11");

  await page.getByRole("button", { name: "Preview" }).first().click();
  await page.getByRole("button", { name: "Publish" }).first().click();
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${OUT}/c-12-publish-pop.png` });
  log("SNAP c-12");
  await page.keyboard.press("Escape");
  await page.locator('[aria-label="Share"]').first().click();
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${OUT}/c-13-share-dlg.png` });
  log("SNAP c-13");
} catch (e) {
  log("EXTRA ERR:", (e.message || "").split("\n")[0]);
}

await browser.close();
log("DONE");
