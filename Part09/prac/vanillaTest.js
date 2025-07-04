// Just for testing
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true).pathname;

  switch (parsed) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello Underworld!" }));
      break;

    case "/other":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("other page");
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Nope" }));
      break;
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
