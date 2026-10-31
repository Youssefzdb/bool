import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "https://bool.so"],
  ["drop", "https://bool.so/drop"],
  ["gallery", "https://bool.so/gallery"],
  ["pricing", "https://bool.so/pricing"],
  ["docs", "https://bool.so/docs"],
  ["whats-new", "https://bool.so/whats-new"],
  ["use-cases", "https://bool.so/use-cases"],
];

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

for (const [name, url] of pages) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    // auto-scroll to trigger lazy loading
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const step = () => {
          window.scrollBy(0, 600);
          total += 600;
          if (total >= document.body.scrollHeight) return resolve();
          setTimeout(step, 120);
        };
        step();
      });
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log(`OK ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message.split("\n")[0]}`);
  }
  await page.close();
}

await browser.close();
