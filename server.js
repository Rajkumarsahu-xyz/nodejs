// . implement a client-server applica5on with the express, hJp, and socket.io modules for the following scenario Display the student details in the server console aOer gePng a request (connec5on) from a client. Broadcast the only odd visitor count from the server to all clients with the new client connec5ons. do e

const net = require("net");
const server = net.createServer((socket) => {
  console.log("Client connected.");
  socket.on("data", (data) => {
    // Display the student details in the server terminal
    console.log(`Student details received: ${data}`);

    // Send a "Thank you" message to the client terminal
    socket.write("Thank you");
  });
  socket.on("end", () => {
    console.log("Client disconnected.");
  });
});
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
