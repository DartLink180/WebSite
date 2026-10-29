const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const screenshots = [
  "v296-menu.png",
  "v296-x01.png",
  "v296-cricket.png",
  "v296-course.png",
  "v296-around-world.png",
  "v296-killer.png",
  "v296-tournoi.png",
];

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dartlink-build-"));
  for (const name of ["build.cjs", "index.html", "app.js", "style.css"]) {
    fs.copyFileSync(path.join(root, name), path.join(dir, name));
  }
  fs.mkdirSync(path.join(dir, "public", "screenshots"), { recursive: true });
  for (const name of screenshots) {
    fs.copyFileSync(
      path.join(root, "public", "screenshots", name),
      path.join(dir, "public", "screenshots", name),
    );
  }
  fs.mkdirSync(path.join(dir, "public", "brand"), { recursive: true });
  for (const name of ["wordmark.png", "signature.png", "mark.png"]) {
    fs.copyFileSync(
      path.join(root, "public", "brand", name),
      path.join(dir, "public", "brand", name),
    );
  }
  return dir;
}
function build(dir) {
  return spawnSync(process.execPath, ["build.cjs"], {
    cwd: dir,
    encoding: "utf8",
  });
}

test("fresh build includes the complete site and only intended public resources", () => {
  const dir = fixture();
  try {
    fs.writeFileSync(
      path.join(dir, "public", "local-config.txt"),
      "must not be published",
    );
    const result = build(dir);
    assert.equal(result.status, 0, result.stderr);
    for (const name of ["index.html", "app.js", "style.css"]) {
      assert.deepEqual(
        fs.readFileSync(path.join(dir, "dist", name)),
        fs.readFileSync(path.join(dir, name)),
      );
    }
    for (const name of screenshots) {
      assert.deepEqual(
        fs.readFileSync(path.join(dir, "dist", "screenshots", name)),
        fs.readFileSync(path.join(dir, "public", "screenshots", name)),
      );
    }
    assert.deepEqual(fs.readdirSync(path.join(dir, "dist")).sort(), [
      ".nojekyll",
      "app.js",
      "brand",
      "index.html",
      "screenshots",
      "style.css",
    ]);
    assert.equal(build(dir).status, 0, "repeatable build");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("provided brand files are copied byte-for-byte, unrelated files stay private", () => {
  const dir = fixture();
  try {
    for (const name of ["wordmark.png", "signature.png", "mark.png"]) {
      fs.writeFileSync(
        path.join(dir, "public", "brand", name),
        Buffer.from(`copy fixture: ${name}`),
      );
    }
    fs.writeFileSync(
      path.join(dir, "public", "brand", "notes.txt"),
      "not an asset",
    );
    assert.equal(build(dir).status, 0);
    assert.deepEqual(fs.readdirSync(path.join(dir, "dist", "brand")).sort(), [
      "mark.png",
      "signature.png",
      "wordmark.png",
    ]);
    for (const name of ["wordmark.png", "signature.png", "mark.png"]) {
      assert.deepEqual(
        fs.readFileSync(path.join(dir, "dist", "brand", name)),
        fs.readFileSync(path.join(dir, "public", "brand", name)),
      );
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("missing required screenshot fails the build instead of publishing broken images", () => {
  const dir = fixture();
  try {
    fs.unlinkSync(path.join(dir, "public", "screenshots", "v296-menu.png"));
    const result = build(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /v296-menu\.png/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
