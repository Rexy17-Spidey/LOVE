const fs = require("fs");
const path = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\assets\\photo-inbox\\video-call-memories\\";
const files = fs.readdirSync(path).filter(f => f.endsWith(".jpeg"));
files.forEach(f => {
  const stat = fs.statSync(path + f);
  console.log(`${f} (${stat.size} bytes)`);
});
