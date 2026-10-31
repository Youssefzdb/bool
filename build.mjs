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

try {
  await page.goto("https://bool.com/dashboard", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2600);

  // dismiss dialogs
  await page.evaluate(() => {
    Array.from(document.querySelectorAll("button"))
      .filter((b) => (b.textContent || "").trim() === "No thanks" || b.getAttribute("aria-label") === "Close")
      .forEach((b) => b.click());
  });

  // the hero prompt — textarea or contenteditable
  const box = page
    .locator("textarea:visible, input[placeholder^=Describe]:visible, [contenteditable=true]:visible")
    .first();
  if (!(await box.count())) {
    log("NO_PROMPT");
    process.exit(1);
  }
  await box.click().catch(() => {});
  await page.keyboard.type("a habit tracker with daily check-ins, streaks and a weekly chart", { delay: 12 });
  await page.screenshot({ path: `${OUT}/app-16-create-filled.png` });

  // submit: try a send button containing an svg (arrow) or any "Build"/"Submit"
  await page.evaluate(() => {
    const cand =
      Array.from(document.querySelectorAll("button")).find((b) => /build|create|submit/i.test(b.textContent || "")) ||
      Array.from(document.querySelectorAll("form button, textarea ~ button")).find((b) => b.querySelector("svg"));
    (cand || document.querySelector("button"))?.click();
  });
  log("SUBMITTED");

  // wait for navigation into the builder chat
  let chatUrl = "";
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(3000);
    const u = page.url();
    if (!/dashboard$/.test(u) && !/\/app(s)?\/?$/.test(u)) { chatUrl = u; break; }
    log(`wait ${i}: ${u}`);
  }
  log("CHAT_URL:", chatUrl || page.url());

  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/app-17-chat-build.png`, fullPage: false });
  const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 260);
  log("CHAT TXT:", t);

  // let the build progress a bit, then capture again
  await page.waitForTimeout(25000);
  await page.screenshot({ path: `${OUT}/app-18-build-progress.png`, fullPage: false });
  log("URL2:", page.url());
  log("TXT2:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 220));

  await page.waitForTimeout(30000);
  await page.screenshot({ path: `${OUT}/app-19-build-final.png`, fullPage: false });
  log("URL3:", page.url());
  log("TXT3:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 220));

  // click preview/app tab if there
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("button, a, [role=tab]")).find((b) => /preview|visit|open/i.test(b.textContent || ""));
    el?.click();
  });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/app-20-editor.png`, fullPage: false });

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/build-error.png` }).catch(() => {});
}

await browser.close();
