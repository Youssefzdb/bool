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
const txt = async () => (await page.locator("body").innerText()).replace(/\s+/g, " ");

async function dismiss() {
  await page.evaluate(() =>
    Array.from(document.querySelectorAll("button"))
      .filter((b) => (b.textContent || "").trim() === "No thanks" || b.getAttribute("aria-label") === "Close")
      .forEach((b) => b.click())
  );
  await page.waitForTimeout(700);
}

try {
  await page.goto("https://bool.com/dashboard", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);
  await dismiss();

  // A) Invite friends (bottom sidebar)
  const invite = page.locator('button, [role=button], a').filter({ hasText: /^Invite friends$/ }).first();
  log("INVITE_COUNT:", await invite.count());
  if (await invite.count()) {
    await invite.click({ timeout: 6000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/x01-invite-friends.png` });
    log("INVITE TXT:", (await txt()).slice(0, 300));
    log("INVITE URL:", page.url());
    // close modal if open
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    await dismiss();
  }

  // B) Profile row bottom (enchanting-stealer)
  const prof = page.locator("button, [role=button]").filter({ hasText: /enchanting-stealer/ }).last();
  log("PROFILE_COUNT:", await prof.count());
  if (await prof.count()) {
    await prof.click({ timeout: 6000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/x02-profile-menu.png` });
    log("PROFILE TXT:", (await txt()).slice(0, 320));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
  }

  // C) Workspace switcher card (Personal / Free plan)
  const ws = page.locator("button, [role=button]").filter({ hasText: /Personal\s*Free plan|Free plan/ }).first();
  log("WS_COUNT:", await ws.count());
  if (await ws.count()) {
    await ws.click({ timeout: 6000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/x03-workspace-switcher.png` });
    log("WS TXT:", (await txt()).slice(0, 320));
    // keep the panel open? close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
  }

  // D) Credits row → target page
  const cred = page.locator("button, [role=button], a").filter({ hasText: /^Credits/ }).first();
  log("CRED_COUNT:", await cred.count());
  if (await cred.count()) {
    await cred.click({ timeout: 6000 });
    await page.waitForTimeout(2500);
    const cUrl = page.url();
    log("CREDITS URL:", cUrl);
    await page.screenshot({ path: `${OUT}/x04-credits-click.png` });
    log("CREDITS TXT:", (await txt()).slice(0, 300));
  } else {
    // goto usage directly
    await page.goto("https://bool.com/workspaces/personal-ahc1ldnmh2cx/usage", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/x04-credits-click.png` });
    log("Usage URL:", page.url());
  }

  // E) Billing + Members tabs of workspace settings
  for (const [tab, file] of [["Billing", "x05-billing"], ["Members", "x06-members"], ["General", "x07-general"]]) {
    await page.goto(`https://bool.com/workspaces/personal-ahc1ldnmh2cx/settings/${tab.toLowerCase()}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2600);
    await dismiss();
    await page.screenshot({ path: `${OUT}/${file}.png`, fullPage: true });
    log(`${tab} URL: ${page.url()}`);
    log(`${tab} TXT: ${(await txt()).slice(0, 240)}`);
  }

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/x-error.png` }).catch(() => {});
}

await browser.close();
