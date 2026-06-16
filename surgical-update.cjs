const fs = require('fs');
let content = fs.readFileSync('D:/code/tepatlaser/src/utils/constants.js', 'utf8');

const replacements = {
  // Update hrefs in SITE_CONFIG
  "href: '/material-acrylic/'": "href: '/jasa-laser-cutting-akrilik/'",
  "href: '/material-mdf/'": "href: '/jasa-laser-cutting-mdf/'",
  "href: '/material-ply-wood-multiplex/'": "href: '/jasa-laser-cutting-plywood/'",
  "href: '/jasa-laser-cutting-metal/'": "href: '/jasa-laser-cutting-metal/'", // Remains the same but safe to include
  "href: '/jasa-laser-cutting-stainless/'": "href: '/jasa-laser-cutting-stainless/'", // Remains the same
  "href: '/material-acp/'": "href: '/jasa-laser-cutting-acp/'",
  "href: '/material-pvc/'": "href: '/jasa-laser-cutting-pvc/'",
  "href: '/material-grc/'": "href: '/jasa-laser-cutting-grc/'",

  // Update slugs in MATERIALS
  "slug: \"material-acrylic\"": "slug: \"jasa-laser-cutting-akrilik\"",
  "slug: \"material-mdf\"": "slug: \"jasa-laser-cutting-mdf\"",
  "slug: \"material-ply-wood-multiplex\"": "slug: \"jasa-laser-cutting-plywood\"",
  "slug: \"jasa-laser-cutting-metal\"": "slug: \"jasa-laser-cutting-metal\"", // Remains the same
  "slug: \"jasa-laser-cutting-stainless\"": "slug: \"jasa-laser-cutting-stainless\"", // Remains the same
  "slug: \"material-acp\"": "slug: \"jasa-laser-cutting-acp\"",
  "slug: \"material-pvc\"": "slug: \"jasa-laser-cutting-pvc\"",
  "slug: \"material-grc\"": "slug: \"jasa-laser-cutting-grc\""
};

for (const [oldStr, newStr] of Object.entries(replacements)) {
  content = content.replace(oldStr, newStr);
}

fs.writeFileSync('D:/code/tepatlaser/src/utils/constants.js', content, 'utf8');
console.log('constants.js updated with surgical precision.');
