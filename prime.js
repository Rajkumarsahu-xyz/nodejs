// Prime number
// Create a web server application with the http module for the following scenario Create a server node. js application using http module to verify whether a number is prime or not.Accept a number from the input text field of the client page and provide the output values as a response with the click event on a button.

const http = require("http");
const url = require("url");
const isPrime = (number) => {
  if (number < 2) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
};
const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true);
  if (req.url.startsWith("/check")) {
    const number = parseInt(query.number, 10);
    if (Number.isNaN(number)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid input");
    } else {
      const result = isPrime(number) ? "prime" : "not prime";
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`The number ${number} is ${result}.`);
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Prime Number Checker</title>
 <script>
 async function checkPrime() {
 const number = document.getElementById('number').value;
 const response = await fetch('/check?number=' + number);
 const result = await response.text();
 document.getElementById('result').innerText = result;
 }
 </script>
 </head>
 <body>
 <h1>Prime Number Checker</h1>
 <label for="number">Number:</label>
 <input type="number" id="number" name="number" min="1">
 <button onclick="checkPrime()">Check</button>
 <p id="result"></p>
 </body>
 </html>
 `);
  }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
