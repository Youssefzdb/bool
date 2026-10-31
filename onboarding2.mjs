import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const NAME = "Shooter";
const IDEA = "a habit tracker with daily check-ins and streaks";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
const body = async () =>
  (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 240);

try {
  await page.goto("https://bool.com/onboarding", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1200);

  let ideaSent = false;

  for (let i = 0; i < 32; i++) {
    if (!/onboarding/.test(page.url())) {
      log("LEFT_ONBOARDING_URL:", page.url());
      break;
    }

    log(`S${i}:`, await body());
    await page.screenshot({ path: `${OUT}/onboard2-${String(i).padStart(2, "0")}.png` });

    // 1) fill any visible text inputs
    const inputs = page.locator('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):visible, textarea:visible');
    const n = await inputs.count();
    for (let k = 0; k < n; k++) {
      const el = inputs.nth(k);
      const ph = (await el.getAttribute("placeholder")) || "";
      const type = (await el.getAttribute("type")) || "text";
      if (type === "email" || type === "password") continue;
      if (/search/i.test(ph)) continue;
      const fill = /describe|idea|what.*(build|want)|app/i.test(ph + (await el.evaluate((e) => e.id) || "")) && !ideaSent
        ? IDEA
        : NAME;
      await el.fill(fill);
      if (fill === IDEA) ideaSent = true;
      log(`filled input ${k} (${ph.slice(0, 24)}) -> ${fill}`);
    }

    // 2) click an option if any (role=radio or option-ish cards)
    const option = page.locator('[role="radio"]:visible, .cursor-pointer:visible').first();
    if (await option.count()) {
      await option.click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(600);
    }

    // 3) click submit/advance — prefer the enabled one
    const advSelectors = [
      'button[len="0"]:not([disabled])', // placeholder (shouldn't match anything)
      'button:has-text("Continue"):not([disabled])',
      'button:has-text("Next"):not([disabled])',
    ];
    let advanced = false;
    for (const sel of advSelectors) {
      const btn = page.locator(sel).first();
      if (await btn.count()) {
        await btn.click({ timeout: 6000 }).catch(() => {});
        await page.waitForTimeout(1600);
        advanced = true;
        break;
      }
    }
    if (!advanced) {
      // generic: last enabled button labeled create/get/build/submit/done/tell us
      const last = page.locator('button:not([disabled]):has-text("Get started"), button:not([disabled]):has-text("Create"), button:not([disabled]):has-text("Build"), button:not([disabled]):has-text("Done"), button:not([disabled]):has-text("Skip"), button:not([disabled]):has-text("Start")').last();
      if (await last.count()) {
        await last.click({ timeout: 6000 }).catch(() => {});
        await page.waitForTimeout(1600);
      } else {
        // idea submit: send button (arrow) after prompt fill
        const send = page.locator('button:has(svg):not([disabled])').last();
        await send.click({ timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(2200);
      }
    }
  }

  log("FINAL URL:", page.url());
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/dashboard-final.png`, fullPage: true });
  log("DASH TXT:", await body());

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => `${a.textContent.trim().slice(0, 24)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors).slice(0, 4000));

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("STATE_SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
}

await browser.close();
