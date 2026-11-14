const fs = require("fs");

// Fix mobile heading sizes in constellation.css
const constPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\constellation.css";
let constCss = fs.readFileSync(constPath, "utf8");
constCss = constCss.replace(
  `@media (max-width: 768px) {`,
  `@media (max-width: 768px) {
  .constellation-section .section-title {
    font-size: clamp(1.4rem, 6vw, 2.2rem) !important;
    word-break: break-word;
  }`
);
fs.writeFileSync(constPath, constCss, "utf8");

// Fix mobile heading sizes in garden.css
const gardenPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\garden.css";
let gardenCss = fs.readFileSync(gardenPath, "utf8");
gardenCss = gardenCss.replace(
  `@media (max-width: 768px) {`,
  `@media (max-width: 768px) {
  .garden-section .section-title {
    font-size: clamp(1.4rem, 6vw, 2.2rem) !important;
    word-break: break-word;
  }`
);
fs.writeFileSync(gardenPath, gardenCss, "utf8");

console.log("Updated mobile heading sizes in constellation.css and garden.css");
