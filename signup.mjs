import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });

const EMAIL = "shooter6602@fldubai.com";
const PASS = "Str0ng-Temp#9182";
const log = (...a) => console.log(...a);

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  deviceScaleFactor: 1,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();
page.on("console", (m) => {
  if (m.type() === "error") log("CONSOLE_ERR:", m.text().slice(0, 160));
});

try {
  await page.goto("https://bool.so/login", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/login.png` });
  log("URL:", page.url());

  // toggle to Sign up if present
  const signupBtn = page.locator('text=/^Sign up$/i').first();
  if (await signupBtn.count()) {
    await signupBtn.click();
    await page.waitForTimeout(900);
    log("toggled to sign up");
  }

  // dump visible headings/buttons to understand layout
  const texts = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1,h2,h3,button,a,input"))
      .slice(0, 40)
      .map((el) => `${el.tagName}:${(el.placeholder || el.textContent || el.type || "").trim().slice(0, 40)}`)
  );
  log("ELEMENTS:", texts.join(" | "));

  await page.fill('input#email, input[type=email]', EMAIL, { timeout: 8000 });
  await page.fill('input#password, input[type=password]', PASS, { timeout: 8000 });
  await page.screenshot({ path: `${OUT}/signup-filled.png` });

  // submit = last button that reads Sign up / Create account / Continue
  const submit = page.locator('button:has-text("Sign up"), button:has-text("Create account"), button:has-text("Continue")').last();
  await submit.click({ timeout: 8000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/after-submit-1.png` });
  log("AFTER_URL:", page.url());

  // detect captcha / error / verify message
  const body = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 600);
  log("BODY:", body);

  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/after-submit-2.png` });
  log("URL2:", page.url());

  // check authenticated state markers
  const markers = await page.evaluate(() => {
    const t = document.body.innerText;
    return {
      hasWorkspace: /workspace|dashboard|your apps|new app/i.test(t),
      hasCaptcha: /captcha|verify you|robot/i.test(t),
    };
  });
  log("MARKERS:", JSON.stringify(markers));

  await ctx.storageState({ path: "/root/bool-clone/.secret/state.json" });
  log("STATE_SAVED");
} catch (e) {
  log("ERR:", e.message.split("\n")[0]);
  await page.screenshot({ path: `${OUT}/error.png`, fullPage: false }).catch(() => {});
}

await browser.close();
