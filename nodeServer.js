const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello World!</h1>");
    res.end();
  } else if (req.url === "/html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const renderHTML = fs.readFileSync("node.html");
    res.write(renderHTML);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>You're not allowed here bud</h1>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Up On Port: ${PORT}`);
});
