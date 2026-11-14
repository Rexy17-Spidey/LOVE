const fs = require('fs');
// We can check CSS files for fixed widths or calc min-widths
const cssFiles = fs.readdirSync('c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css')
  .filter(f => f.endsWith('.css'));

for (let file of cssFiles) {
  const content = fs.readFileSync('c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\' + file, 'utf8');
  const fixedMatches = content.match(/width:\s*([4-9]\d\d|1\d\d\d)px/g);
  const minWidthMatches = content.match(/min-width:\s*([4-9]\d\d|1\d\d\d)px/g);
  if (fixedMatches || minWidthMatches) {
    console.log(file, 'Fixed:', fixedMatches, 'Min:', minWidthMatches);
  }
}
