import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const CONFIRM =
  "https://bool.com/auth/confirm?token_hash=pkce_71a833164e6ec62f0532961b349df4c8a9269f0d68addd165d2e0869&type=signup&next=%2F";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
try {
  await page.goto(CONFIRM, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/confirm-page.png` });

  const btn = page.locator('button:has-text("Confirm email"), a:has-text("Confirm email")').first();
  log("BTN_COUNT:", await btn.count());
  if (await btn.count()) {
    await btn.click();
    log("clicked confirm");
  } else {
    // maybe an <a href> style link
    const alt = page.locator("a, button").filter({ hasText: /confirm/i }).first();
    if (await alt.count()) await alt.click();
  }

  // wait for redirect away from /auth/confirm
  for (let i = 0; i < 12; i++) {
    await page.waitForTimeout(1500);
    log(`T${i} URL:`, page.url());
    if (!/auth\/confirm/.test(page.url())) break;
  }

  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/after-confirm-click.png`, fullPage: true });
  log("FINAL_URL:", page.url());

  const body = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 500);
  log("BODY:", body);

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .slice(0, 80)
      .map((a) => `${a.textContent.trim().slice(0, 24)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors).slice(0, 3500));

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-confirmed.json" });
  log("STATE_SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
  await page.screenshot({ path: `${OUT}/confirm-error.png` }).catch(() => {});
}

await browser.close();
