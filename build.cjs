const fs = require("node:fs");
const path = require("node:path");
const output = path.join(__dirname, "dist");
fs.mkdirSync(output, { recursive: true });
for (const file of ["index.html", "app.js", "style.css", "account.js", "silent-check-sso.html", "silent-check-sso.js"]) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.mkdirSync(path.join(output, "vendor", "keycloak-js"), { recursive: true });
for (const file of ["keycloak.js", "deprecations.js", "LICENSE"]) fs.copyFileSync(path.join(__dirname, "vendor", "keycloak-js", file), path.join(output, "vendor", "keycloak-js", file));
fs.mkdirSync(path.join(output, "news"), { recursive: true });
fs.copyFileSync(path.join(__dirname, "public", "news", "pdc.json"), path.join(output, "news", "pdc.json"));
// Publish only the assets used by the site, never local configuration files.
const screenshots = [
  "X01.PNG", "X012.PNG", "X01IA.PNG",
  "cricket.PNG", "cricket2.PNG",
  "course300.PNG", "course3002.PNG", "course10.PNG",
  "arroundtheworld.PNG", "ciblesaleatoire.PNG",
  "killer.PNG", "killer2.PNG",
  "tournoi.PNG", "tournoi2.PNG", "tourjoi3.PNG",
  "menu.PNG", "remote1.PNG", "remote2.PNG", "remote3.PNG",
];
fs.mkdirSync(path.join(output, "screenshots"), { recursive: true });
for (const file of screenshots) {
  fs.copyFileSync(
    path.join(__dirname, "screenshots", file),
    path.join(output, "screenshots", file),
  );
}
const installations = ["dartlink1.jpeg", "dartlink2.jpeg", "dartlink3.jpeg"];
fs.mkdirSync(path.join(output, "installations"), { recursive: true });
for (const file of installations) {
  fs.copyFileSync(
    path.join(__dirname, "screenshots", file),
    path.join(output, "installations", file),
  );
}
// Original brand assets are copied unchanged when supplied.
for (const file of ["wordmark.png", "signature.png", "mark.png"]) {
  const source = path.join(__dirname, "public", "brand", file);
  {
    fs.mkdirSync(path.join(output, "brand"), { recursive: true });
    fs.copyFileSync(source, path.join(output, "brand", file));
  }
}
fs.writeFileSync(path.join(output, ".nojekyll"), "");
console.log("DartLink : site et ressources préparés dans dist/");
