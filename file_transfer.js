// File Transfer Express App
// Create an express applica5on for the following scenario a)Create a text file and add student informa5on(Reg. No., Name, Grade) in the server system.Accept a file name from the input text field of a user web page and transfer the requested file using sendFile() func5on from the server as a response to the buJon click event from the user web page.

const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>File Transfer Express App</title>
 <script>
 async function handleSubmit(e) {
 e.preventDefault();
 const fileName = document.getElementById("fileName").value;
 window.location.href = "/download/" + encodeURIComponent(fileName);
 }
 </script>
 </head>
 <body>
 <h1>File Transfer Express App</h1>
 <form onsubmit="handleSubmit(event)">
 <label for="fileName">Enter the file name:</label>
 <input type="text" name="fileName" id="fileName" required>
 <button type="submit">Download</button>
 </form>
 </body>
 </html>
 `);
});
app.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, `${fileName}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
