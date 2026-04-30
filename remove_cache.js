const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = fs.readdirSync(dir);
  for (let f of files) {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('"use cache"')) {
        console.log('Modifying ' + p);
        fs.writeFileSync(p, c.replace(/"use cache";\r?\n?/g, '').replace(/  "use cache";\r?\n?/g, ''));
      }
    }
  }
}

walk('src');
walk('app');
console.log('Done.');
