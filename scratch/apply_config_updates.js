const fs = require("fs");
const path = "c:/Users/rahul/Desktop/LOVE/the-art-of-her/config.js";

let content = fs.readFileSync(path, "utf8");

// 1. Update Chapter 1
content = content.replace(
  /(\s*id:\s*"chapter-1",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 2. Update interlude-instagram
content = content.replace(
  /(\s*id:\s*"interlude-instagram",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 3. Update Chapter 2
content = content.replace(
  /(\s*id:\s*"chapter-2",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 4. Update chapter-3-night
content = content.replace(
  /(\s*id:\s*"chapter-3-night",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 5. Update chapter-3 (Confession)
content = content.replace(
  /(\s*id:\s*"chapter-3",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 6. Update chapter-4
content = content.replace(
  /(\s*id:\s*"chapter-4",[\s\S]*?location:\s*"[^"]*",)\s*image:\s*"[^"]*",\s*realSrc:\s*"[^"]*",\s*caption:\s*"[^"]*",/,
  "$1"
);

// 7. In Chapter 5: replace queen with my babee / MY BABEE
content = content.replace(/queenDeclaration:\s*"MA QUEEN\.\s*♡"/g, 'queenDeclaration: "MY BABEE. ♡"');
content = content.replace(
  /"Because, in my little world, you are the queen\."/g,
  '"Because, in my little world, you are my babee."'
);
content = content.replace(
  /"“I want to understand you, respect your choices, and walk beside you at whatever pace makes you happy\. Because, in my little world, you are the queen\.”"/g,
  '"“I want to understand you, respect your choices, and walk beside you at whatever pace makes you happy. Because, in my little world, you are my babee.”"'
);

// Check if there is "MA QUEEN. ♡" in chapter 5 paragraphs
content = content.replace(/"MA QUEEN\. ♡"/g, '"MY BABEE. ♡"');

// 8. In final letter postscript:
content = content.replace(
  /postscript:\s*"P\.S\. You will always be the masterpiece of this exhibition\. MA QUEEN\. ♡"/g,
  'postscript: "P.S. You will always be the masterpiece of this exhibition. MY BABEE. ♡"'
);

// 9. Update ourLittleCalls subtitles and quote
content = content.replace(
  /subheading:\s*"Those Calls I Didn't Want to End"/g,
  'subheading: "Those little moments when we were miles apart, but still found a way to sit together."'
);
content = content.replace(
  /openingQuote:\s*"Some of my favourite moments aren't photographs we posed for\. They're just little calls, random expressions, your face on my screen, and me wishing the conversation wouldn't end\."/g,
  'openingQuote: "Some of my favourite moments weren\'t planned photographs. They were just ordinary calls, your expressions, my silly faces, random conversations and moments when I wished the call would last a little longer."'
);
content = content.replace(
  /dedicationNote:\s*"Preserved exactly as they happened — in the middle of late nights, busy days, and quiet hours where distance didn't matter\."/g,
  'dedicationNote: "Preserved exactly as they happened — in the middle of late nights, busy days, and quiet hours where distance didn\'t matter."'
);

fs.writeFileSync(path, content, "utf8");
console.log("Updated config.js successfully!");
