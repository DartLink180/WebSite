const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseUrl =
  (process.env.SITE_URL || "http://127.0.0.1:4173").replace(/\/$/, "") + "/";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-proxy-server"],
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    const responses = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) responses.push(`${r.status()} ${r.url()}`);
    });
    let checked = 0;
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of [
        "",
        "experience",
        "faq",
        "contact",
        "mentions",
        "absente",
      ]) {
        await page.goto(`${baseUrl}#/${route}`, { waitUntil: "networkidle" });
        await page.locator("h1").waitFor();
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
          `overflow ${width} ${route}`,
        );
        await page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.forEach((img) => (img.loading = "eager")),
          );
        await page.waitForFunction(() =>
          [...document.images].every((img) => img.complete),
        );
        const broken = await page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs
              .filter((img) => img.complete && !img.naturalWidth)
              .map((img) => img.src),
          );
        assert.deepEqual(broken, []);
        checked++;
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Menu" }).click();
    assert.equal(
      await page.getByRole("navigation").getByRole("link", { name: "Télécommande" }).getAttribute("href"),
      "https://dartlink.fr/remote/",
    );
    assert.equal(
      await page.getByRole("link", { name: "Ouvrir DartLink Remote" }).getAttribute("href"),
      "https://dartlink.fr/remote/",
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Menu" })
        .getAttribute("aria-expanded"),
      "true",
    );
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "L’expérience", exact: true })
      .click();
    await page
      .getByRole("heading", { level: 1 })
      .filter({ hasText: "Chaque lancer" })
      .waitFor();
    assert.equal(
      await page
        .getByRole("button", { name: "Menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Questions fréquentes" })
      .focus();
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.goto(baseUrl + "#/faq");
    await page.locator("summary").first().click();
    assert.equal(
      await page.locator("details").first().getAttribute("open"),
      "",
    );
    await page.goto(baseUrl + "#/contact");
    await page.getByRole("button", { name: "Simuler l’envoi" }).click();
    assert.equal(await page.locator("#contact-status").textContent(), "");
    await page.locator("#contact-name").fill("Personne fictive");
    await page.locator("#contact-email").fill("demo@example.com");
    await page.locator("#contact-project").fill("Projet de test fictif");
    const submitted = [];
    const listener = (req) => submitted.push(req.url());
    page.on("request", listener);
    await page.getByRole("button", { name: "Simuler l’envoi" }).click();
    assert.match(
      await page.locator("#contact-status").textContent(),
      /Aucun message envoyé/,
    );
    assert.equal(await page.locator("#contact-name").inputValue(), "");
    assert.deepEqual(submitted, []);
    page.off("request", listener);
    await page.goto(baseUrl);
    await page.keyboard.press("Tab");
    await page.getByRole("link", { name: "Aller au contenu" }).focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
    const redirects = [];
    await page.route("https://dartlink.fr/manager/", (r) => {
      redirects.push(r.request().url());
      return r.fulfill({
        status: 200,
        body: "Manager destination intercepted for test",
      });
    });
    for (const route of ["login", "manager", "manager/devices"]) {
      await page.goto(`${baseUrl}#/${route}`);
      await page
        .getByText("Manager destination intercepted for test")
        .waitFor();
    }
    assert.equal(redirects.length, 3);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(baseUrl, { waitUntil: "networkidle" });
      await page
        .locator("img")
        .evaluateAll((imgs) => imgs.forEach((img) => (img.loading = "eager")));
      await page.waitForFunction(() =>
        [...document.images].every((img) => img.complete),
      );
      await page.screenshot({
        path: require("node:path").join(
          require("node:os").tmpdir(),
          `dartlink-redesign-${width}.png`,
        ),
        fullPage: true,
      });
    }
    assert.deepEqual(errors, [], "JavaScript errors");
    assert.deepEqual(responses, [], "HTTP failures");
    console.log(
      `PASS: ${checked} route/viewport checks; Remote links, mobile navigation, Escape, FAQ, form validation/no transmission, skip link, three Manager redirects, no JS errors or missing assets.`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
