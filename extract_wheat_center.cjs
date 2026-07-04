const fs = require('fs');
const content = fs.readFileSync('public/logo-trigal.svg', 'utf-8');
const match = content.match(/d="([^"]+)"/);
if (!match) { console.log('No match'); process.exit(1); }

const d = match[1];
const tokens = d.match(/[a-zA-Z]|-?\d+\.?\d*/g);
let x = 0, y = 0;
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
const xs = [];
let i = 0;
while (i < tokens.length) {
  const token = tokens[i];
  if (/[a-zA-Z]/.test(token)) {
    const cmd = token;
    i++;
    if (cmd === 'z' || cmd === 'Z') continue;
    const args = [];
    while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
      args.push(parseFloat(tokens[i]));
      i++;
    }
    for (let j = 0; j < args.length; j += 2) {
      if (j + 1 < args.length) {
        if (cmd === cmd.toLowerCase()) {
          // relative
          x += args[j];
          y += args[j+1];
        } else {
          x = args[j];
          y = args[j+1];
        }
        xs.push(x);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  } else {
    i++;
  }
}

console.log('X range:', minX, 'to', maxX);
console.log('Y range:', minY, 'to', maxY);
console.log('Center X:', (minX + maxX) / 2);
console.log('Center Y:', (minY + maxY) / 2);
console.log('Total points:', xs.length);
