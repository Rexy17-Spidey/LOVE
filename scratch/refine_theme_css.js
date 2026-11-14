const fs = require("fs");
const cssPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\themes.css";
let css = fs.readFileSync(cssPath, "utf8");

// Update grid and dialog styling
css = css.replace(
  `/* Grid of 5 Theme Cards */
.theme-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}`,
  `/* Grid of 5 Theme Cards */
.theme-cards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.9rem;
  margin-bottom: 1.8rem;
}`
);

css = css.replace(
  `padding: clamp(2rem, 4vw, 3.5rem);`,
  `padding: clamp(1.5rem, 3vw, 2.5rem);`
);

css = css.replace(
  `margin-bottom: 2.5rem;`,
  `margin-bottom: 1.5rem;`
);

fs.writeFileSync(cssPath, css, "utf8");
console.log("Updated themes.css for 5-column layout");
