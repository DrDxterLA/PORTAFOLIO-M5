import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import projects from "./data/projects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {

  // API REST
  if (req.url === "/api/projects" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(projects));
    return;
  }

  // Servir index.html
  if (req.url === "/" || req.url === "/index.html") {
    const filePath = path.join(__dirname, "public", "index.html");
    fs.readFile(filePath, (err, content) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
    return;
  }

  // Servir JS
  if (req.url.endsWith(".js")) {
    const filePath = path.join(__dirname, "public", req.url);
    fs.readFile(filePath, (err, content) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(content);
    });
    return;
  }

  // Servir CSS
  if (req.url.endsWith(".css")) {
    const filePath = path.join(__dirname, "public", req.url);
    fs.readFile(filePath, (err, content) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(content);
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end("404 Not Found");
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});