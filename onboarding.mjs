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
  viewport: { width: 1280, height: 860 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state-confirmed.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
const body = async () =>
  (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 260);

try {
  await page.goto("https://bool.com/onboarding", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);

  for (let i = 0; i < 26; i++) {
    log(`STEP ${i} URL:`, page.url());
    log(`STEP ${i} TXT:`, await body());
    await page.screenshot({ path: `${OUT}/onboard-step-${String(i).padStart(2, "0")}.png` });

    // done heuristics
    if (!/onboarding/.test(page.url())) {
      log("LEFT_ONBOARDING");
      break;
    }

    // click a first real option (radio / card / option rows)
    const option =
      page.locator('[role="radio"]:visible, .cursor-pointer:visible').first();
    const optCount = await option.count();
    if (optCount) {
      await option.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(700);
    }

    // then click advance button if present
    const adv = page
      .locator('button:has-text("Get started"), button:has-text("Continue"), button:has-text("Next"), button:has-text("Build"), button:has-text("Done"), button:has-text("Finish")')
      .first();
    if (await adv.count()) {
      await adv.click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(1800);
    } else {
      // maybe selections auto-advance; small wait then check again
      await page.waitForTimeout(900);
      const stillHere = /onboarding/.test(page.url());
      if (stillHere) {
        // try Enter on active step or click text "Skip"
        const skip = page.locator('button:has-text("Skip")').first();
        if (await skip.count()) await skip.click({ timeout: 4000 }).catch(() => {});
      }
    }
  }

  log("FINAL URL:", page.url());
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/dashboard.png`, fullPage: true });
  log("DASH TXT:", await body());

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => `${a.textContent.trim().slice(0, 26)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors).slice(0, 4000));

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("STATE_DASH_SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
  await page.screenshot({ path: `${OUT}/onboard-error.png` }).catch(() => {});
}

await browser.close();
