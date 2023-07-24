// / Implement a client-server application with the express, HTTP, and socket.io modules to display the student (your) details in the server console after getting a request (connection) from a client. Then Trigger events from the server to display a series of even numbers after every 2 seconds on the client web page. Finally, display Thank you in the server console with the termination of connect from the client.

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;
const student = {
  name: "Raj Kumar Sahu",
  rollNo: "63",
  department: "CSE",
  semester: "6th",
};
app.get("/", (req, res) => {
  const html = `
 <!DOCTYPE html>
 <html>
 <head>
 <title>Even Numbers</title>
 </head>
 <body>
 <h1>Even Numbers</h1>
 <ul id="evenNumbers"></ul>
 <script src="/socket.io/socket.io.js"></script>
 <script>
 const socket = io();
 const evenNumbers = document.getElementById('evenNumbers');
 socket.on('evenNumber', (number) => {
 const li = document.createElement('li');
 li.textContent = number;
 evenNumbers.appendChild(li);
 });
 </script>
 </body>
 </html>
 `;
  res.send(html);
});
io.on("connection", (socket) => {
  console.log("Client connected");
  // Display student details in server console
  console.log("Student Details:");
  console.log(`Name: ${student.name}`);
  console.log(`Roll No.: ${student.rollNo}`);
  console.log(`Department: ${student.department}`);
  console.log(`Semester: ${student.semester}`);
  // Send even numbers to the client after every 2 seconds
  let counter = 0;
  const interval = setInterval(() => {
    counter += 2;
    socket.emit("evenNumber", counter);
  }, 2000);
  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
    console.log("Thank you!");
  });
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
