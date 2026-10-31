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

// A) probe alternate authenticated routes directly
for (const path of ["/", "/apps", "/dashboard", "/home", "/workspace", "/new"]) {
  try {
    await page.goto(`https://bool.com${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2200);
    const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 130);
    log(`ROUTE ${path} -> ${page.url()}`);
    log(`  TXT: ${t}`);
  } catch (e) {
    log(`ROUTE ${path} ERR ${(e.message || "").split("\n")[0].slice(0, 60)}`);
  }
}

// B) onboarding: dump roles on the multi-select step then select + continue
try {
  await page.goto("https://bool.com/onboarding", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1200);

  await page.evaluate(() => {
    const gs = Array.from(document.querySelectorAll("button")).find((b) => /get started/i.test(b.textContent || ""));
    gs?.click();
  });
  await page.waitForTimeout(1400);
  await page.locator("input:visible").first().fill("Shooter").catch(() => {});
  await page.evaluate(() => {
    const c = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
    c?.click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => {
    const dev = Array.from(document.querySelectorAll('button[role="radio"]')).find((b) => /developer/i.test(b.textContent || ""));
    dev?.click();
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const c = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
    c?.click();
  });
  await page.waitForTimeout(1600);

  log("MULTI_ROLE_DUMP:", await page.evaluate(() =>
    Array.from(document.querySelectorAll("[role]"))
      .map((el) => `${el.getAttribute("role")}:${(el.textContent || "").trim().slice(0, 26)}`)
      .slice(0, 30)
      .join(" | ")
  ));

  const pick = await page.evaluate(() => {
    const boxes = Array.from(document.querySelectorAll('button[role="checkbox"], [role="checkbox"], [role="menuitemcheckbox"]'));
    if (!boxes.length) return "NO_CHECKBOX";
    const target = boxes.find((b) => /personal/i.test(b.textContent || "")) || boxes[0];
    target.click();
    return `PICKED=${(target.textContent || "").trim().slice(0, 30)}`;
  });
  log("PICK:", pick);
  await page.waitForTimeout(900);

  const act = await page.evaluate(() => {
    const c = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
    if (c && !c.disabled) { c.click(); return "CONTINUE"; }
    return "NONE";
  });
  log("ACT:", act);
  await page.waitForTimeout(2200);
  log("URL:", page.url());
  log("TXT:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 220));
  await page.screenshot({ path: `${OUT}/multi-step.png`, fullPage: true });
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("SAVED");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
}

await browser.close();
