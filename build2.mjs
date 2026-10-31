import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const IDEA = "a habit tracker with daily check-ins, streaks and a weekly chart";

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
  await page.waitForTimeout(600);

  // fill the prompt
  const box = page.locator("textarea:visible, [contenteditable=true]:visible").first();
  if (!(await box.count())) { log("NO_PROMPT"); process.exit(1); }
  await box.click();
  await page.keyboard.type(IDEA, { delay: 12 });
  await page.waitForTimeout(600);

  // dump buttons near the prompt container for evidence
  const dump = await page.evaluate(() => {
    const ta = document.querySelector("textarea");
    const root = ta ? (ta.closest("form") || ta.parentElement?.parentElement?.parentElement || document.body) : document.body;
    return Array.from(root.querySelectorAll("button"))
      .map((b, i) => ({
        i,
        t: (b.textContent || "").trim().slice(0, 18),
        aria: b.getAttribute("aria-label") || "",
        cls: (b.className || "").toString().slice(0, 70),
        svg: (b.querySelector("path")?.getAttribute("d") || "").slice(0, 40),
        rect: (r => `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`)(b.getBoundingClientRect()),
      }));
  });
  log("BTNS:", JSON.stringify(dump));

  // attempt 1: Enter key submit (standard chat UX)
  await page.keyboard.press("Enter");
  await page.waitForTimeout(4000);
  log("after Enter:", page.url());

  // attempt 2: click arrow-up / send button inside prompt container
  if (/dashboard/.test(page.url())) {
    const clicked = await page.evaluate(() => {
      const ta = document.querySelector("textarea");
      const root = ta ? (ta.closest("form") || ta.closest("div[class*=rounded]") || document.body) : document.body;
      const btns = Array.from(root.querySelectorAll("button")).filter((b) => b.offsetParent !== null);
      // priority: aria-label send/arrow
      let target = btns.find((b) => /send|arrow|submit/i.test(b.getAttribute("aria-label") || ""));
      if (!target) {
        // arrow-up svg path (lucide: M12 19V5 / m5 12 7-7 7 7)
        target = btns.find((b) => {
          const d = b.querySelector("path")?.getAttribute("d") || "";
          return /M12 19V5|12V5|19V5/.test(d);
        });
      }
      if (!target) {
        // last round button with primary bg
        target = btns.filter((b) => /bg-primary|bg-blue|rounded-full/.test((b.className || "").toString())).pop();
      }
      if (!target) return "NO_TARGET";
      target.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
      target.dispatchEvent(new MouseEvent("pointerup", { bubbles: true }));
      target.click();
      return `CLICKED aria=${target.getAttribute("aria-label")} cls=${(target.className || "").toString().slice(0, 50)}`;
    });
    log("SEND:", clicked);
  }

  // wait for redirect into the builder/chat
  let chatUrl = "";
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(3000);
    const u = page.url();
    if (!/dashboard/.test(u)) { chatUrl = u; break; }
    if (i % 5 === 0) log(`wait ${i}: ${u}`);
  }
  log("BUILDER_URL:", chatUrl || page.url());
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${OUT}/app-17-chat-build.png` });
  log("TXT:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 260));

  // capture build progress stages
  await page.waitForTimeout(20000);
  await page.screenshot({ path: `${OUT}/app-18-build-progress.png` });
  log("URL2:", page.url());

  await page.waitForTimeout(30000);
  await page.screenshot({ path: `${OUT}/app-19-build-final.png` });
  log("URL3:", page.url());
  log("TXT3:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 240));

  // toggle Preview/Code tabs if present
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("button, [role=tab], a")).filter((b) => /preview|code/i.test((b.textContent || "").trim()) && (b.textContent || "").trim().length < 10);
    tabs[0]?.click();
  });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${OUT}/app-20-editor.png` });
  log("URL4:", page.url());

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/build2-error.png` }).catch(() => {});
}

await browser.close();
