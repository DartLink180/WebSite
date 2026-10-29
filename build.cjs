const fs = require("node:fs");
const path = require("node:path");
const output = path.join(__dirname, "dist");
fs.mkdirSync(output, { recursive: true });
for (const file of ["index.html", "app.js", "style.css"]) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.mkdirSync(path.join(output, "news"), { recursive: true });
fs.copyFileSync(path.join(__dirname, "public", "news", "pdc.json"), path.join(output, "news", "pdc.json"));
// Publish only the assets used by the site, never local configuration files.
const screenshots = [
  "v296-menu.png",
  "v296-x01.png",
  "v296-cricket.png",
  "v296-course.png",
  "v296-around-world.png",
  "v296-killer.png",
  "v296-tournoi.png",
];
fs.mkdirSync(path.join(output, "screenshots"), { recursive: true });
for (const file of screenshots) {
  fs.copyFileSync(
    path.join(__dirname, "public", "screenshots", file),
    path.join(output, "screenshots", file),
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
