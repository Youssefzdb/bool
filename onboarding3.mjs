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
  await page.waitForTimeout(1200);

  let typedIdea = false;

  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(1300);
    const url = page.url();
    const txt = (await page.locator("body").innerText()).replace(/\s+/g, " ");
    log(`S${i} ${/onboarding|apps|dashboard/.test(url) ? "" : "★"} URL=${url}`);
    log(`S${i} TXT=${txt.slice(0, 180)}`);
    await page.screenshot({ path: `${OUT}/onb3-${String(i).padStart(2, "0")}.png` });

    if (!/onboarding/i.test(url)) {
      log("LEFT");
      break;
    }

    // fill visible inputs (name; prompt idea once)
    const inputs = await page.locator("input:visible:not([type=checkbox]):not([type=radio]), textarea:visible").count();
    for (let k = 0; k < inputs; k++) {
      const ph = (await page.locator("input:visible:not([type=checkbox]):not([type=radio]), textarea:visible").nth(k).getAttribute("placeholder")) || "";
      if (/search/i.test(ph)) continue;
      log(`  input[${k}] ph=${ph.slice(0, 30)}`);
      await page.locator("input:visible:not([type=checkbox]):not([type=radio]), textarea:visible").nth(k).click();
      const val = /idea|build|create/i.test(ph) && !typedIdea ? "a habit tracker with daily check-ins and streaks" : "Shooter";
      await page.keyboard.type(val, { delay: 30 });
      if (val !== "Shooter") typedIdea = true;
    }

    // pick the first selectable option, then advance — all via DOM clicks
    await page.evaluate(() => {
      const pick = document.querySelector('[role="radio"], [data-radix-collection-item], .option-row, [class*="option"]');
      (pick || null)?.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
      (pick || null)?.click();
    });

    const res = await page.evaluate(() => {
      const labels = ["continue", "get started", "next", "done", "skip", "build"];
      const btn = Array.from(document.querySelectorAll("button, [role=button], a"))
        .filter((b) => labels.some((L) => (b.textContent || "").toLowerCase().trim() === L))
        .filter((b) => (b.offsetWidth || 0) > 0)
        .filter((b) => !(b.textContent || "").toLowerCase().includes("back"))[0];
      if (!btn) return "NO_BTN";
      btn.click();
      return `CLICKED=${(btn.textContent || "").trim()}`;
    });
    log(`S${i} ACT:`, res);
    await page.waitForTimeout(1700);
  }

  // whatever we ended on — capture as dashboard state
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/end-state.png`, fullPage: true });
  const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 400);
  log("END_TXT:", t);

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => `${(a.textContent || "").trim().slice(0, 22)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors).slice(0, 3500));
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
}

await browser.close();
