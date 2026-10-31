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

async function dismissDialogs() {
  for (let d = 0; d < 3; d++) {
    const hit = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(
        (b) => (b.textContent || "").trim() === "No thanks" || b.getAttribute("aria-label") === "Close"
      );
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!hit) break;
    await page.waitForTimeout(800);
  }
}

async function go(route, marker, file) {
  try {
    await page.goto(`https://bool.com${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2600);
    await dismissDialogs();
    const t = (await page.locator("body").innerText()).replace(/\s+/g, " ");
    const is404 = /go home|whats different/i.test(t) && !marker.test(t);
    log(`ROUTE ${route} 404=${is404}`);
    if (is404) { log(`  SKIP (404) ${route}`); return; }
    log(`  TXT: ${t.slice(0, 150)}`);
    await page.screenshot({ path: `${OUT}/${file}.png`, fullPage: true });
  } catch (e) {
    log(`ROUTE ${route} ERR: ${(e.message || "").split("\n")[0].slice(0, 80)}`);
  }
}

try {
  await go("/", /idea/i, "app-01-home");
  await go("/dashboard", /idea|new/i, "app-02-dashboard-hero");
  await go("/projects", /projects/i, "app-03-projects");
  await go("/projects/shared", /shared/i, "app-04-projects-shared");
  await go("/projects/favorites", /favorites/i, "app-05-projects-favorites");
  await go("/projects/archive", /archive/i, "app-06-projects-archive");
  await go("/projects/recents", /recents/i, "app-07-projects-recents");
  await go("/templates", /template/i, "app-08-templates");
  await go("/drop", /drop/i, "app-09-drop");
  await go("/domains", /domain/i, "app-10-domains");
  await go("/chats", /chat/i, "app-11-chats");
  await go("/agents", /agent/i, "app-12-agents");
  await go("/workspaces/personal-ahc1ldnmh2cx/usage", /usage|credit/i, "app-13-usage-billing");
  await go("/workspaces/personal-ahc1ldnmh2cx", /workspace|members/i, "app-14-workspace");

  // create flow via the dashboard hero
  await page.goto("https://bool.com/dashboard", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  await dismissDialogs();

  const start = page.locator("a, button").filter({ hasText: /start building|new bool|new app/i }).first();
  if (await start.count()) {
    await start.click({ timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(2400);
    log("CREATE URL:", page.url());
    await page.screenshot({ path: `${OUT}/app-15-create.png`, fullPage: true });
    log("CREATE TXT:", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 180));

    const box = page.locator("textarea:visible, input[placeholder^=Describe]:visible, [contenteditable=true]:visible").first();
    if (await box.count()) {
      await box.click().catch(() => {});
      await page.keyboard.type("a habit tracker with daily check-ins and streaks", { delay: 16 });
      await page.screenshot({ path: `${OUT}/app-16-create-filled.png`, fullPage: true });
      log("FILLED_IDEA URL:", page.url());
    } else log("NO_PROMPT_BOX");
  } else {
    await page.screenshot({ path: `${OUT}/app-15-create.png`, fullPage: true });
  }

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
}

await browser.close();
