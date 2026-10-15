const fs = require('node:fs');
const path = require('node:path');
const output = path.join(__dirname, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'app.js', 'style.css']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log('DartLink V2 : fichiers statiques préparés dans dist/');
