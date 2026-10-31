import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
page.on("framenavigated", (f) => f === page.mainFrame() && log("NAV:", f.url()));

try {
  await page.goto("https://bool.com/onboarding", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);

  const btns = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button, a, [role=button]")).map((b) => ({
      t: (b.textContent || "").trim().slice(0, 30),
      tag: b.tagName,
      disabled: b.disabled === true || b.getAttribute("aria-disabled") === "true",
      rect: (r => `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`)(b.getBoundingClientRect()),
      z: getComputedStyle(b).zIndex,
      pos: getComputedStyle(b).position,
    }))
  );

  log("BTNS:", JSON.stringify(btns.filter((b) => b.t)));

  // JS click the get started button directly in DOM
  const r = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("button, [role=button], a")).find((b) => /get started/i.test(b.textContent || ""));
    if (!el) return "NOT_FOUND";
    el.scrollIntoView({ block: "center" });
    el.click();
    return `CLICKED tag=${el.tagName} rect=${JSON.stringify(el.getBoundingClientRect())}`;
  });
  log("JS:", r);
  await page.waitForTimeout(2500);
  log("URL_AFTER:", page.url());
  const body = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 200);
  log("BODY:", body);
  await page.screenshot({ path: `${OUT}/after-js-click.png` });

  // if reached question 1, answer name via input + real keyboard gesture
  if (/call you|name/i.test(body)) {
    const inp = page.locator("input:visible").first();
    if (await inp.count()) {
      await inp.click();
      await page.keyboard.type("Shooter", { delay: 40 });
      await page.waitForTimeout(500);
      const cont = page.locator('button:has-text("Continue")').first();
      await cont.click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(1800);
      log("URL2:", page.url());
      await page.screenshot({ path: `${OUT}/after-name.png` });
    }
  }
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
}

await browser.close();
