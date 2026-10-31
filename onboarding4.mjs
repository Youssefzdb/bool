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

  let typedIdea = false;

  for (let i = 0; i < 24; i++) {
    await page.waitForTimeout(1400);
    const url = page.url();
    const txt = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 170);
    log(`S${i} URL=${url}`);
    log(`S${i} TXT=${txt}`);
    await page.screenshot({ path: `${OUT}/onb4-${String(i).padStart(2, "0")}.png` });

    if (!/onboarding/i.test(url)) break;

    // 1: fill inputs (name → Shooter; idea → once)
    const fills = await page.evaluate(() =>
      Array.from(document.querySelectorAll("input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=email]):not([type=password]), textarea"))
        .filter((el) => el.offsetParent !== null && !/search/i.test(el.placeholder || ""))
        .map((el) => ({ ph: el.placeholder || "", id: el.id }))
    );
    for (const f of fills) {
      if (/search/i.test(f.ph)) continue;
      const isIdeaQ = /what are you building|describe/i.test(txt) && /describe|idea|build|want/i.test(f.ph + " " + f.id);
      if (isIdeaQ && !typedIdea) {
        await page.locator(`[placeholder="${f.ph}"]`).first().click().catch(() => {});
        await page.keyboard.type("a habit tracker with daily check-ins and streaks", { delay: 25 });
        typedIdea = true;
        log("TYPED_IDEA");
      } else if (!f.ph.match(/email|password/i)) {
        await page.locator("input:visible:not([type=email]):not([type=password])").first().fill("Shooter");
        log("FILLED_NAME");
      }
    }

    // 2: click the first radio option (Developer preferred; else first)
    const picked = await page.evaluate(() => {
      const radios = Array.from(document.querySelectorAll('button[role="radio"]')).filter((b) => b.offsetParent !== null);
      if (!radios.length) return "NO_RADIO";
      const win = radios.find((b) => /developer/i.test(b.textContent || "")) || radios[radios.length - 1];
      win.click();
      return `PICKED=${(win.textContent || "").trim()}`;
    });
    log(`S${i} ${picked}`);

    // 3: advance — Continue if enabled, else Skip
    const act = await page.evaluate(() => {
      const cont = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Continue");
      if (cont && !cont.disabled) { cont.click(); return "CONTINUE"; }
      const skip = Array.from(document.querySelectorAll("button")).find((b) => (b.textContent || "").trim() === "Skip");
      if (skip && !skip.disabled) { skip.click(); return "SKIP"; }
      const gs = Array.from(document.querySelectorAll("button")).find((b) => /get started|build it|create/i.test(b.textContent || ""));
      if (gs) { gs.click(); return "ADV:" + (gs.textContent || "").trim(); }
      return "NONE";
    });
    log(`S${i} ACT=${act}`);
  }

  await page.waitForTimeout(2800);
  await page.screenshot({ path: `${OUT}/end4.png`, fullPage: true });
  log("END_URL:", page.url());
  log("END_TXT:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 300));

  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => `${(a.textContent || "").trim().slice(0, 22)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors).slice(0, 3000));
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
}

await browser.close();
