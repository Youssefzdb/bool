import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const APP_URL = "https://bool.com/projects/oHFZTi2KxVmnLqJzWmC-d";

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
const txt = async () => (await page.locator("body").innerText()).replace(/\s+/g, " ");

try {
  await page.goto(APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);

  // click Retry build if present
  const retry = page.locator('button:has-text("Retry build")').first();
  if (await retry.count()) {
    await retry.click({ timeout: 6000 });
    log("RETRY_CLICKED");
  } else {
    log("NO_RETRY_BTN — building already? TXT:", (await txt()).slice(0, 120));
  }

  // wait for a real app preview: iframe appears / "interrupted" gone for good
  let finalTxt = "";
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(10000);
    finalTxt = await txt();
    const interrupted = /Build interrupted/i.test(finalTxt);
    const building = /Building your habit tracker|Working for \d+s|Writing the code/i.test(finalTxt) || /Verifying/i.test(finalTxt);
    log(`poll${i} interrupted=${interrupted} building=${building}`);
    if (!interrupted && !building) break;
    // if it got interrupted again, click retry once more
    if (interrupted) {
      const r = page.locator('button:has-text("Retry build")').first();
      if (await r.count()) { await r.click().catch(() => {}); log("retry-again"); }
    }
  }

  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/app-26-preview-final.png` });
  log("FINAL TXT:", finalTxt.slice(0, 260));

  // app Dashboard tab
  const dash = page.locator('button:has-text("Dashboard"), [role=tab]:has-text("Dashboard")').first();
  if (await dash.count()) {
    await dash.click({ timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${OUT}/app-27-app-dashboard.png` });
    log("DASH TXT:", (await txt()).slice(0, 180));
    const prev = page.locator('button:has-text("Preview"), [role=tab]:has-text("Preview")').first();
    if (await prev.count()) { await prev.click().catch(() => {}); await page.waitForTimeout(2500); }
  }

  // share dialog (top-right share icon)
  const share = page.locator('button[aria-label*=hare i], button:has-text("Share"), [title*=hare]').first();
  if (await share.count()) {
    await share.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/app-28-share.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1200);
  }

  // history (clock icon top bar)
  const hist = page.locator('button[aria-label*="istory"], [title*="istory"]').first();
  if (await hist.count()) {
    await hist.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/app-29-history.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1200);
  }

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/capture5-error.png` }).catch(() => {});
}

await browser.close();
