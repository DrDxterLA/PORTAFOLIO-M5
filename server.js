import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.resolve();
const PORT = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // ================= API =================

  if (pathname === "/api/skills") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "Node.js", level: 85 }
    ]));
    return;
  }

  if (pathname === "/api/portfolio") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([
      {
        title: "Sistema de Eventos",
        description: "Plataforma de gestión completa",
        image: "https://picsum.photos/600/400?1"
      },
      {
        title: "Landing Corporativa",
        description: "Sitio moderno con Bootstrap",
        image: "https://picsum.photos/600/400?2"
      },
      {
        title: "API REST Node",
        description: "Servidor sin Express",
        image: "https://picsum.photos/600/400?3"
      }
    ]));
    return;
  }

  // ================= ARCHIVOS ESTÁTICOS =================

  if (pathname === "/") {
    pathname = "/public/index.html";
  } else {
    pathname = "/public" + pathname;
  }

  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - No encontrado</h1>");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});