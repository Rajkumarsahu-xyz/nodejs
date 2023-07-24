// Arithmetic Express App
// Implement an express application for the following Accept a number from the input text field of a user web page and perform the basic arithmetic operations, increment (++), decrement (-), and square, on the number inside a middleware function of server node.js application. Display the output values in the user web page as a response to the click event from the button


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function arithmeticMiddleware(req, res, next) {
  if (req.body.number) {
    const number = parseFloat(req.body.number);
    req.arithmetic = {
      increment: number + 1,
      decrement: number - 1,
      square: number * number,
    };
  }
  next();
}
app.get("/", (req, res) => {
  res.send(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Arithmetic Express App</title>
 <script>
 async function handleSubmit(e) {
 e.preventDefault();
 const number = parseFloat(document.getElementById("number").value);
 const response = await fetch('/calculate', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({ number }),
 });
 const htmlResponse = await response.text();
 document.getElementById("results").innerHTML = htmlResponse;
 }
 </script>
 </head>
 <body>
 <h1>Arithmetic Express App</h1>
 <form onsubmit="handleSubmit(event)">
 <label for="number">Enter a number:</label>
 <input type="number" name="number" id="number" required>
 <button type="submit">Calculate</button>
 </form>
 <ul id="results"></ul>
 </body>
 </html>
 `);
});
app.post("/calculate", arithmeticMiddleware, (req, res) => {
  const { increment, decrement, square } = req.arithmetic;
  const htmlResponse = `
 <li>Increment: ${increment}</li>
 <li>Decrement: ${decrement}</li>
 <li>Square: ${square}</li>
 `;
  res.send(htmlResponse);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
