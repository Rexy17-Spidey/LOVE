const http = require("http");
const fs = require("fs");
const path = require("path");

const root = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her";
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg"
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split("?")[0].split("#")[0];
  if (reqUrl === "/") reqUrl = "/index.html";

  const filePath = path.join(root, decodeURIComponent(reqUrl.replace(/\//g, "\\")));

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found: " + reqUrl);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8085;
server.listen(PORT, () => {
  console.log(`Exhibition server running at http://localhost:${PORT}/`);
});
