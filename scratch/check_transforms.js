const fs = require("fs");
// Let's inspect where .site-header is positioned in css
const cssFiles = ["base.css", "components.css", "opening.css", "editorial.css", "themes.css"];
cssFiles.forEach(f => {
  const c = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\" + f, "utf8");
  const matches = [...c.matchAll(/(\.[a-zA-Z0-9_\-]+)\s*\{[^}]*?transform:[^}]*?\}/g)];
  if (matches.length > 0) {
    console.log(f, "has transforms on:", matches.map(m => m[1]));
  }
});
