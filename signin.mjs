import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const EMAIL = "shooter6602@fldubai.com";
const PASS = "Str0ng-Temp#9182";

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();

try {
  await page.goto("https://bool.com/login", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);

  // ensure we're on Sign in view (default). Fill email + password.
  await page.locator("input#email, input[type=email]").first().fill(EMAIL);
  await page.locator("input#password, input[type=password]").first().fill(PASS);
  await page.screenshot({ path: `${OUT}/signin-filled.png` });

  const submit = page.locator('button:has-text("Sign in")').last();
  await submit.click({ timeout: 8000 });
  await page.waitForTimeout(5000);

  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/after-signin.png`, fullPage: false });
  const t = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 220);
  log("TXT:", t);

  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("STATE_SAVED");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  await page.screenshot({ path: `${OUT}/signin-error.png` }).catch(() => {});
}

await browser.close();
