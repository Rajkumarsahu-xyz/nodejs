// Nth Fibonacci number
// Create a web server application with http module for the following scenario Create a server node. js application using http module to find the nth Fibonacci number a Accept a number from the input text field of the client page and provide the output values as a response with the click event on a button.

const http = require("http");
const url = require("url");
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};
const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true);
  if (req.url.startsWith("/fibonacci")) {
    const n = parseInt(query.n, 10);
    if (Number.isNaN(n) || n < 0) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid input");
    } else {
      const result = fibonacci(n);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`The Fibonacci number at position ${n} is ${result}.`);
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Fibonacci Number Finder</title>
 <script>
 async function findFibonacci() {
 const n = document.getElementById('n').value;
 const response = await fetch('/fibonacci?n=' + n);
 const result = await response.text();
 document.getElementById('result').innerText = result;
 }
 </script>
 </head>
 <body>
 <h1>Fibonacci Number Finder</h1>
 <label for="n">Position (n):</label>
 <input type="number" id="n" name="n" min="0">
 <button onclick="findFibonacci()">Find Fibonacci Number</button>
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



// Fibonacci till nth number

// const http = require("http");
// const querystring = require("querystring");
// function fibonacci(n) {
//   if (n < 2) {
//     return n;
//   } else {
//     return fibonacci(n - 1) + fibonacci(n - 2);
//   }
// }
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>Fibonacci Calculator</title></head>");
//     res.write("<body>");
//     res.write('<form method="post" action="/calculate">');
//     res.write('<label for="number">Enter a number:</label>');
//     res.write('<input type="text" name="number" id="number">');
//     res.write('<button type="submit">Calculate Fibonacci</button>');
//     res.write("</form>");
//     res.write("</body>");
//     res.write("</html>");
//     return res.end();
//   } else if (req.url === "/calculate" && req.method === "POST") {
//     let requestBody = "";
//     req.on("data", (chunk) => {
//       requestBody += chunk.toString();
//     });
//     req.on("end", () => {
//       const { number } = querystring.parse(requestBody);
//       const fibonacciNumbers = [];
//       for (let i = 0; i <= number; i++) {
//         fibonacciNumbers.push(fibonacci(i));
//       }
//       res.setHeader("Content-Type", "text/plain");
//       res.end(fibonacciNumbers.toString());
//     });
//   } else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>404 Not Found</title></head>");
//     res.write("<body><h1>404 Not Found</h1></body>");
//     res.write("</html>");
//     return res.end();
//   }
// });
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
