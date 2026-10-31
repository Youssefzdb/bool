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

try {
  await page.goto("https://bool.com/onboarding", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1400);

  // to the "What are you building?" step
  await page.evaluate(() => {
    const gs = Array.from(document.querySelectorAll("button")).find((b) => /get started/i.test(b.textContent || ""));
    gs?.click();
  });
  await page.waitForTimeout(1500);
  await page.fill("input:visible", "Shooter", { timeout: 6000 }).catch(() => {});
  await page.evaluate(() => {
    const c = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
    c?.click();
  });
  await page.waitForTimeout(1500);

  const dump = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button, div[class*=cursor], [role], input, div[class*=grid] > *"))
      .filter((el) => (el.textContent || "").trim().length > 0 && (el.textContent || "").trim().length < 60)
      .slice(0, 40)
      .map((el) => ({
        tag: el.tagName,
        role: el.getAttribute("role"),
        cls: (el.className || "").toString().slice(0, 80),
        t: (el.textContent || "").trim().slice(0, 40),
        rect: (r => `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.x)},${Math.round(r.y)}`)(el.getBoundingClientRect()),
      }))
  );
  log("DUMP:", JSON.stringify(dump, null, 1).slice(0, 5000));

  // click the first real option text, then Continue
  const res = await page.evaluate(() => {
    const opt = Array.from(document.querySelectorAll("*")).find(
      (el) => (el.textContent || "").trim() === "A personal project" && el.children.length === 0
    );
    if (!opt) return "OPT_NOT_FOUND";
    // click the card ancestor with pointer cursor
    let card = opt;
    for (let up = 0; up < 4 && card.parentElement; up++) {
      const style = getComputedStyle(card);
      if (style.cursor === "pointer") break;
      card = card.parentElement;
    }
    (card || opt).click();
    return `CLICKED ${card.tagName}.${(card.className || "").toString().slice(0, 60)}`;
  });
  log("OPT:", res);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/opt-picked.png` });

  const res2 = await page.evaluate(() => {
    const c = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
    c?.click();
    return c ? "CONTINUE_CLICKED" : "NO_CONTINUE";
  });
  log("ACT:", res2);
  await page.waitForTimeout(2000);
  log("URL:", page.url());
  const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 240);
  log("TXT:", t);

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
}

await browser.close();
