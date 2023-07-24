// Student
// Create an express applica5on with the following requirements Accept Student Name, Reg. no., Roll. No., Mobile No. and Mail Id from the input text fields of a client page and perform a chain of valida5ons on the data using the express-validator module in the server application.b)Check all the fields are not empty, minimum and maximum lengths of data.Add a submit buJon on the client web page to submit the data and display the warning messages if required.

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send(`
//     <form method="post" action="/submit">
//       <label for="name">Name:</label>
//       <input type="text" name="name" id="name"><br><br>
//       <label for="roll">Roll No:</label>
//       <input type="number" name="roll" id="roll"><br><br>
//       <label for="cgpa">CGPA:</label>
//       <input type="number" name="cgpa" id="cgpa"><br><br>
//       <label for="subject">Subject:</label>
//       <input type="text" name="subject" id="subject"><br><br>
//       <input type="submit" value="Submit">
//     </form>
//   `);
// });

// app.post("/submit", (req, res) => {
//   const name = req.body.name;
//   const roll = req.body.roll;
//   const cgpa = req.body.cgpa;
//   const subject = req.body.subject;
//   res.send(
//     `Name: ${name}<br>Roll No: ${roll}<br>CGPA: ${cgpa}<br>Subject: ${subject}`
//   );
// });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

const express = require("express");
const { body, validationResult } = require("express-validator");
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
 <title>Validation Express App</title>
 <script>
 async function handleSubmit(e) {
 e.preventDefault();
 const formData = new FormData(e.target);
 const data = Object.fromEntries(formData.entries());
 const response = await fetch('/submit', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(data),
 });
 const result = await response.json();
 if (result.errors) {
 const errorMessage = result.errors.map(error => error.msg).join(', ');
 document.getElementById("warning").innerText = errorMessage;
 } else {
 document.getElementById("warning").innerText = '';
 alert('Data submitted successfully');
 }
 }
 </script>
 </head>
 <body>
 <h1>Validation Express App</h1>
 <form onsubmit="handleSubmit(event)">
 <label for="name">Name:</label>
 <input type="text" name="name" id="name" >
 <br>
 <label for="regNo">Reg. No.:</label>
 <input type="text" name="regNo" id="regNo" >
 <br>
 <label for="rollNo">Roll. No.:</label>
 <input type="text" name="rollNo" id="rollNo" >
 <br>
 <label for="mobileNo">Mobile No.:</label>
 <input type="text" name="mobileNo" id="mobileNo" >
 <br>
 <label for="email">Email:</label>
 <input type="email" name="email" id="email" >
 <br>
 <button type="submit">Submit</button>
 </form>
 <p id="warning" style="color: red"></p>
 </body>
 </html>
 `);
});
app.post(
  "/submit",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name should be between 2 and 50 characters"),
    body("regNo")
      .notEmpty()
      .withMessage("Reg. No. is required")
      .isLength({ min: 1, max: 10 })
      .withMessage("Reg. No. should be between 1 and 10 characters"),
    body("rollNo")
      .notEmpty()
      .withMessage("Roll. No. is required")
      .isLength({ min: 1, max: 10 })
      .withMessage("Roll. No. should be between 1 and 10 characters"),
    body("mobileNo")
      .notEmpty()
      .withMessage("Mobile No. is required")
      .isLength({ min: 10, max: 15 })
      .withMessage("Mobile No. should be between 10 and 15 characters")
      .isMobilePhone()
      .withMessage("Invalid mobile number"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.status(200).json({ message: "Data submitted successfully" });
    }
  }
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
