// Create a node.js web server application with the HTTP module to produce a series of Armstrong numbers up to a given number. Accept a number from the input text field of the client page and provide the output values as a response with the click event on a button.

const http = require("http");
const url = require("url");
const querystring = require("querystring");
const port = 3000;
function isArmstrong(number) {
  let sum = 0;
  let numDigits = number.toString().length;
  let temp = number;
  while (temp > 0) {
    let digit = temp % 10;
    sum += Math.pow(digit, numDigits);
    temp = Math.floor(temp / 10);
  }
  return sum === number;
}
function getArmstrongNumbers(maxNumber) {
  const armstrongNumbers = [];
  for (let i = 1; i <= maxNumber; i++) {
    if (isArmstrong(i)) {
      armstrongNumbers.push(i);
    }
  }
  return armstrongNumbers;
}
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const params = querystring.parse(query);
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
 <!DOCTYPE html>
 <html>
 <head>
 <title>Armstrong Number Finder</title>
 </head>
 <body>
 <h1>Armstrong Number Finder</h1>
 <form method="GET" action="/armstrong">
 <label for="maxNumber">Find Armstrong numbers up to:</label>
 <input type="number" id="maxNumber" name="maxNumber" required>
 <br><br>
 <input type="submit" value="Find Armstrong Numbers">
 </form>
 </body>
 </html>
 `);
    res.end();
  } else if (pathname === "/armstrong") {
    const maxNumber = parseInt(params.maxNumber);
    const armstrongNumbers = getArmstrongNumbers(maxNumber);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
 <!DOCTYPE html>
 <html>
 <head>
 <title>Armstrong Number Finder</title>
 </head>
 <body>
 <h1>Armstrong Number Finder</h1>
 <p>Armstrong numbers up to ${maxNumber}:</p>
 <ul>
 `);
    armstrongNumbers.forEach((number) => {
      res.write(`<li>${number}</li>`);
    });
    res.write(`
 </ul>
 </body>
 </html>
 `);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
