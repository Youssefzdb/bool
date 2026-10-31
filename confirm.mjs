import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

// decoded from the inbox mail (entities unescaped)
const CONFIRM =
  "https://bool.com/auth/confirm?token_hash=pkce_71a833164e6ec62f0532961b349df4c8a9269f0d68addd165d2e0869&type=signup&next=%2F";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  deviceScaleFactor: 1,
  storageState: "/root/bool-clone/.secret/state.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
try {
  await page.goto(CONFIRM, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/after-confirm.png`, fullPage: false });
  log("URL:", page.url());
  const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 400);
  log("BODY:", t);

  // anchors of the logged-in app for enumeration
  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .slice(0, 60)
      .filter((a) => !a.href.includes("void"))
      .map((a) => `${a.textContent.trim().slice(0, 22)} -> ${a.getAttribute("href")}`)
  );
  log("ANCHORS:", JSON.stringify(anchors.slice(0, 40), null, 0).slice(0, 3000));

  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/loggedin-1.png` });
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-confirmed.json" });
  log("STATE_CONFIRMED_SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
  log("URL:", page.url());
}

await browser.close();
