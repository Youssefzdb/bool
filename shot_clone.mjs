import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const OUT = "/root/bool-clone/shots-clone";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "http://localhost:4173/"],
  ["drop", "http://localhost:4173/drop"],
  ["gallery", "http://localhost:4173/gallery"],
  ["pricing", "http://localhost:4173/pricing"],
  ["docs", "http://localhost:4173/docs"],
  ["whats-new", "http://localhost:4173/whats-new"],
  ["use-cases", "http://localhost:4173/use-cases"],
];

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const [name, url] of pages) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log(`OK ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message.split("\n")[0]}`);
  }
  await page.close();
}

await browser.close();
