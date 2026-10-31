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

try {
  await page.goto("https://bool.com/dashboard", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3200);
  await page.evaluate(() =>
    Array.from(document.querySelectorAll("button"))
      .filter((b) => (b.textContent || "").trim() === "No thanks")
      .forEach((b) => b.click())
  );
  await page.waitForTimeout(700);

  // A) profile row — JS click the element that contains the handle, then walk to nearest button
  const pr = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("*")).filter(
      (n) => (n.children?.length === 0 || n.children.length <= 1) && (n.textContent || "").trim() === "enchanting-stealer"
    )[0];
    if (!el) return "NOT_FOUND";
    let t = el;
    for (let i = 0; i < 6 && t.parentElement; i++) {
      if ((t.getAttribute?.("role") || t.tagName) === "BUTTON" || t.getAttribute("data-state") !== undefined) break;
      t = t.parentElement;
    }
    const r = t.getBoundingClientRect();
    t.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    t.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    t.click();
    return `clicked ${t.tagName}.cls=${(t.className || "").toString().slice(0, 50)} rect=${Math.round(r.x)},${Math.round(r.y)}`;
  });
  log("PROFILE_JS:", pr);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/x02-profile-menu.png` });
  log("PROFILE TXT:", (await txt()).slice(0, 400));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(900);

  // B) workspace switcher card
  const wr = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find(
      (b) => /free plan/i.test(b.textContent || "") && /personal/i.test(b.textContent || "")
    );
    if (!btn) return "NOT_FOUND";
    btn.click();
    return "clicked";
  });
  log("WS_JS:", wr);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/x03-workspace-switcher.png` });
  log("WS TXT:", (await txt()).slice(0, 400));

  // if it navigated to workspace settings, fine; else close panel
  const afterWs = page.url();
  log("WS URL:", afterWs);
  if (!/workspaces/.test(afterWs)) {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
  }

  // C) Credits row click
  const cr = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button, a, [role=button]")).find(
      (b) => (b.textContent || "").trim() === "Credits"
    );
    if (!btn) return "NOT_FOUND";
    btn.click();
    return "clicked";
  });
  log("CREDITS_JS:", cr);
  await page.waitForTimeout(2600);
  const cUrl = page.url();
  log("CREDITS URL:", cUrl);
  await page.screenshot({ path: `${OUT}/x04-credits-click.png` });
  log("CREDITS TXT:", (await txt()).slice(0, 260));

  // D) settings tabs via URL
  for (const tab of ["billing", "members"]) {
    await page.goto(`https://bool.com/workspaces/personal-ahc1ldnmh2cx/settings/${tab}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2600);
    await page.screenshot({ path: `${OUT}/${tab === "billing" ? "x05-billing" : "x06-members"}.png`, fullPage: true });
    log(`${tab.toUpperCase()} TXT:`, (await txt()).slice(0, 260));
  }

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
}

await browser.close();
