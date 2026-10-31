import { chromium } from "playwright-core";

const log = (...a) => console.log(...a);

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  storageState: "/root/bool-clone/.secret/state-dash.json",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});

const page = await ctx.newPage();

try {
  await page.goto("https://bool.com/apps", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);

  const dump = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href], button"))
      .filter((el) => (el.offsetWidth || 0) > 0)
      .slice(0, 70)
      .map((el) => ({
        tag: el.tagName,
        href: el.getAttribute("href") || "",
        t: (el.textContent || "").trim().slice(0, 26),
        rect: (r => `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`)(el.getBoundingClientRect()),
      }))
      .filter((x) => x.t || x.href)
  );
  log("DUMP:", JSON.stringify(dump, null, 1));
} catch (e) {
  log("ERR:", (e.message || "").split("\n")[0]);
}

await browser.close();
