import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-auth";
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log(...a);

const APP_URL = "https://bool.com/projects/oHFZTi2KxVmnLqJzWmC-d";

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

const txt = async () => (await page.locator("body").innerText()).replace(/\s+/g, " ");

try {
  await page.goto(APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);

  // wait for the build to finish (loading screen disappearing / preview content)
  let done = false;
  for (let i = 0; i < 20; i++) {
    const t = await txt();
    const building = /building your habit tracker|working for \d+s|writing the code/i.test(t);
    log(`poll${i} building=${building} :: ${t.slice(0, 100)}`);
    if (!building) { done = true; break; }
    await page.waitForTimeout(10000);
  }
  log("BUILD_DONE:", done);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/app-21-build-complete.png` });
  log("TXT:", (await txt()).slice(0, 220));

  // Dashboard tab (app-level analytics view)
  const dash = page.locator('button:has-text("Dashboard"), [role=tab]:has-text("Dashboard")').first();
  if (await dash.count()) {
    await dash.click({ timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${OUT}/app-22-app-dashboard.png` });
    log("DASH_TAB TXT:", (await txt()).slice(0, 160));
  }

  // back to Preview
  const prev = page.locator('button:has-text("Preview"), [role=tab]:has-text("Preview")').first();
  if (await prev.count()) {
    await prev.click({ timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(3500);
  }

  // Publish dialog
  const pub = page.locator('button:has-text("Publish")').first();
  if (await pub.count()) {
    await pub.click({ timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/app-23-publish-dialog.png` });
    log("PUBLISH TXT:", (await txt()).slice(0, 260));
    // close the dialog without publishing
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1500);
  }

  // Chats page (should now list the current chat)
  await page.goto("https://bool.com/chats", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${OUT}/app-24-chats.png`, fullPage: true });
  log("CHATS TXT:", (await txt()).slice(0, 200));

  // Drop page
  await page.goto("https://bool.com/drop", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${OUT}/app-25-drop.png`, fullPage: true });
  log("DROP TXT:", (await txt()).slice(0, 200));

  // final app URL state
  await ctx.storageState({ path: "/root/bool-clone/.secret/state-dash.json" });
  log("DONE");
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
  log("URL:", page.url());
  await page.screenshot({ path: `${OUT}/capture4-error.png` }).catch(() => {});
}

await browser.close();
