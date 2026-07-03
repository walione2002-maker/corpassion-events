const fs = require('fs');

let c = fs.readFileSync('lib/validations.ts', 'utf8');

c = c.replace(/a-zA-Z\\\\s-'(?=\\])/g, "a-zA-Z\\\\s'-");
c = c.replace(/-\\\\s\\\\./g, '\\\\s\\\\.-');

fs.writeFileSync('lib/validations.ts', c, 'utf8');
