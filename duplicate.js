// Include http module to create a server application and use the fs module to duplicate the original. txt file as the duplicate. txt file in the server with the client(user) request from the browser. Create a source.txt file and add personal information (name, city, state) in the server system for duplication.


const http = require("http");
const fs = require("fs");
// Create a new HTTP server
const server = http.createServer((req, res) => {
  // Handle HTTP requests
  if (req.url === "/duplicate") {
    // Read the source.txt file
    fs.readFile("source.txt", (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        // Write the data to the duplicate.txt file
        fs.writeFile("duplicate.txt", data, (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            // Send a success response
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("File duplicated successfully");
          }
        });
      }
    });
  } else {
    // Send a not found response
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});
// Start the server and listen on a port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
