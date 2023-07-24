// Create a node.js web server application with the http module to perform the search operation on a given set of values. Accept a series of values from the input text fields of the client page and provide the output values as a response with the click event on a button.

const http = require("http");
const url = require("url");
// Define the set of values to search
const values = ["apple", "banana", "orange", "grape", "watermelon"];
// Create a new HTTP server
const server = http.createServer((req, res) => {
  // Handle HTTP requests
  const urlParts = url.parse(req.url, true);
  if (urlParts.pathname === "/") {
    // Serve the HTML page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
 <!DOCTYPE html>
 <html>
 <head>
 <title>Search Values</title>
 </head>
 <body>
 <label for="search-input">Search:</label>
 <input type="text" id="search-input">
 <button id="search-button">Search</button>
 <ul id="result-list"></ul>
 <script>
 const searchButton = document.getElementById('search-button');
 searchButton.addEventListener('click', () => {
 const searchInput = document.getElementById('search-input').value;
 const request = new XMLHttpRequest();
 request.onreadystatechange = () => {
 if (request.readyState === 4 && request.status === 200) {
 const resultList = document.getElementById('result-list');
 resultList.innerHTML = '';
 const values = JSON.parse(request.responseText);
 for (const value of values) {
 const li = document.createElement('li');
 li.innerText = value;
 resultList.appendChild(li);
 }
 }
 };
 request.open('GET', \`/search?query=\${searchInput}\`);
 request.send();
 });
 </script>
 </body>
 </html>
 `);
    res.end();
  } else if (urlParts.pathname === "/search") {
    const query = urlParts.query.query.toLowerCase();
    const results = values.filter((value) => value.includes(query));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});
// Start the server and listen on a port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
