// Create a node.js web server application with the HTTP module to perform sort operations on a given set of values. Accept a series of values from the input text fields of the client page and provide the output values as a response with the click event on a button.

const http = require("http");
const url = require("url");
// Create a HTTP server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  // Serve the HTML page for entering the input values
  if (pathname === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Sort Values</title></head>");
    res.write("<body>");
    res.write('<label for="values">Enter comma-separated values:</label>');
    res.write('<input type="text" id="values">');
    res.write('<button id="sort">Sort</button>');
    res.write('<p id="result"></p>');
    res.write("<script>");
    res.write('const sortBtn = document.getElementById("sort");');
    res.write('sortBtn.addEventListener("click", () => {');
    res.write('const values = document.getElementById("values").value;');
    res.write("const request = new XMLHttpRequest();");
    res.write("request.onreadystatechange = () => {");
    res.write("if (request.readyState === 4 && request.status === 200) {");
    res.write('const result = document.getElementById("result");');
    res.write("result.innerText = request.responseText;");
    res.write("}");
    res.write("};");
    res.write('request.open("POST", "/sort");');
    res.write("request.send(values);");
    res.write("});");
    res.write("</script>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (pathname === "/sort") {
    // Get the input values from the request body
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk.toString();
    });
    req.on("end", () => {
      const values = requestBody.split(",").map(Number);
      // Sort the values in ascending order
      const sortedValues = values.sort((a, b) => a - b);
      // Send the sorted values as a response
      res.setHeader("Content-Type", "text/plain");
      res.end(sortedValues.toString());
    });
  } else {
    // Send a 404 error response for invalid requests
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>404 Not Found</title></head>");
    res.write("<body><h1>404 Not Found</h1></body>");
    res.write("</html>");
    return res.end();
  }
});
// Start the server and listen on a port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
