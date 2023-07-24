// Set and Clear Cookies
// Create an express applica5on with the following requirements a)Set and clear the cookies for a client using the cookie-parser module in the server application.Display the cookie informa5on on the client web page with a click on the show buJon and clear the cookie informa5on from the system with a click on the reset buJon on the user web page

// Set cookie and read cookie usage 


const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Cookie Express App</title>
 <script>
 async function handleShow() {
 const response = await fetch('/show-cookie');
 const cookie = await response.text();
 document.getElementById("cookieInfo").innerText = cookie;
 }
 async function handleReset() {
 await fetch('/clear-cookie');
 document.getElementById("cookieInfo").innerText = '';
 }
 </script>
 </head>
 <body>
 <h1>Cookie Express App</h1>
 <button onclick="handleShow()">Show Cookie</button>
 <button onclick="handleReset()">Reset Cookie</button>
 <p>Cookie information: <span id="cookieInfo"></span></p>
 </body>
 </html>
 `);
});
app.get("/set-cookie", (req, res) => {
  res.cookie("sampleCookie", "This is a sample cookie");
  res.send("Cookie has been set");
});
app.get("/show-cookie", (req, res) => {
  const cookie = req.cookies.sampleCookie || "No cookie found";
  res.send(cookie);
});
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("sampleCookie");
  res.send("Cookie has been cleared");
});
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();
// // Add Cookie Parser middleware
// app.use(cookieParser());
// // Define a route that sets a cookie
// app.get('/set-cookie', (req, res) => {
// res.cookie('name', 'John Doe', { maxAge: 900000, httpOnly: true });
// res.send('Cookie set!');
// });
// // Define a route that reads a cookie
// app.get('/read-cookie', (req, res) => {
// const name = req.cookies.name;
// res.send(`Hello, ${name}!`);
// });
// // Start the server
// app.listen(3000, () => {
// console.log('Server listening on port 3000');
// });