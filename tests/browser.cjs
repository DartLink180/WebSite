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
              .filter((img) => img.hasAttribute("src") && img.complete && !img.naturalWidth)
              .map((img) => img.src),
          );
        assert.deepEqual(broken, []);
        if (route === "experience") {
          assert.equal(await page.locator(".game-card").count(), 19);
          assert.equal(await page.locator(".remote-grid .game-card").count(), 3);
          assert.equal(await page.locator(".installation-photo img").count(), 3);
        }
        checked++;
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl + "#/experience", { waitUntil: "networkidle" });
    assert.equal(await page.getByRole("tab").first().textContent(), "Menu");
    assert.equal(await page.getByRole("tab", { name: "Menu", exact: true }).getAttribute("aria-selected"), "true");
    await page.getByRole("tab", { name: "X01", exact: true }).click();
    const firstCapture = page.getByRole("button", { name: "Agrandir la capture X01 · début" });
    await firstCapture.click();
    const gallery = page.locator("#game-gallery");
    assert.equal(await page.getByRole("dialog", { name: "X01 · début" }).isVisible(), true);
    assert.match(await gallery.locator("#gallery-image").getAttribute("src"), /X01\.PNG$/);
    assert.equal(await gallery.locator("#gallery-count").textContent(), "1 / 2");
    await gallery.getByRole("button", { name: "Image suivante" }).click();
    assert.equal(await gallery.locator("#gallery-title").textContent(), "X01 · en cours");
    await page.keyboard.press("ArrowLeft");
    assert.equal(await gallery.locator("#gallery-title").textContent(), "X01 · début");
    await gallery.getByRole("button", { name: "Image précédente" }).click();
    assert.equal(await gallery.locator("#gallery-title").textContent(), "X01 · en cours");
    assert.equal(await gallery.locator("#gallery-count").textContent(), "2 / 2");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#game-gallery").isVisible(), false);
    assert.equal(await firstCapture.evaluate((button) => document.activeElement === button), true);
    for (const [name, count] of [["Menu", 1], ["X01", 2], ["X01 IA", 1], ["Cricket", 2], ["Course", 3], ["Around the World", 1], ["Cible aléatoire", 1], ["Killer", 2], ["Tournoi", 3]]) {
      await page.getByRole("tab", { name, exact: true }).click();
      assert.equal(await page.locator('[role="tabpanel"]:visible .game-card').count(), count);
    }
    await page.getByRole("tab", { name: "X01", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.getByRole("tab", { name: "X01 IA", exact: true }).getAttribute("aria-selected"), "true");
    await page.getByRole("tab", { name: "Killer", exact: true }).click();
    await page.getByRole("button", { name: "Agrandir la capture Killer · début" }).click();
    assert.equal(await page.locator("#gallery-title").textContent(), "Killer · début");
    await gallery.locator("#gallery-image").evaluate((image) => {
      const start = new Touch({ identifier: 1, target: image, clientX: 300, clientY: 300 });
      const end = new Touch({ identifier: 1, target: image, clientX: 100, clientY: 310 });
      image.dispatchEvent(new TouchEvent("touchstart", { changedTouches: [start] }));
      image.dispatchEvent(new TouchEvent("touchend", { changedTouches: [end] }));
    });
    assert.equal(await page.locator("#gallery-title").textContent(), "Killer · en cours");
    await page.getByRole("button", { name: "Fermer la galerie" }).click();
    const photo = page.getByRole("button", { name: "Agrandir la photo l’installation complète", exact: true });
    await photo.click();
    assert.equal(await gallery.locator("#gallery-count").textContent(), "1 / 3");
    assert.match(await gallery.locator("#gallery-image").getAttribute("src"), /dartlink1\.jpeg$/);
    await gallery.getByRole("button", { name: "Image suivante" }).click();
    assert.match(await gallery.locator("#gallery-image").getAttribute("src"), /dartlink2\.jpeg$/);
    await page.getByRole("button", { name: "Fermer la galerie" }).click();
    assert.equal(await photo.evaluate(button => document.activeElement === button), true);
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    assert.equal(
      await page.getByRole("navigation").getByRole("link", { name: "Télécommande" }).getAttribute("href"),
      "https://dartlink.fr/remote/",
    );
    assert.equal(
      await page.getByRole("link", { name: "Ouvrir DartLink Remote" }).getAttribute("href"),
      "https://dartlink.fr/remote/",
    );
    assert.equal(
      await page.getByRole("navigation").getByRole("link", { name: "Jouer sur mobile" }).getAttribute("href"),
      "https://dartlink.fr/mobile/",
    );
    assert.equal(
      await page.getByRole("main").getByRole("link", { name: "Jouer sur mobile" }).getAttribute("href"),
      "https://dartlink.fr/mobile/",
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Menu", exact: true })
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
        .getByRole("button", { name: "Menu", exact: true })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Questions fréquentes" })
      .focus();
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Menu", exact: true })
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
