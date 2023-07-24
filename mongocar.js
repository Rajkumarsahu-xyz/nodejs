//a) Implement a Node.js application to connect with MongoDB to Create a database and add car collection with the fields- Model, Company, Mileage, color, and Owner. Add multiple documents with Employee data. Finally, Query the above collection to find employees with more than a specific salary and display it in the console window.

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://raj:123%40Rbpmr@cluster0.oiwrogf.mongodb.net/?retryWrites=true&w=majority";
// Replace <username>, <password>, <cluster>, and <dbname> with your own values
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) throw err;
  const db = client.db("<dbname>");
  // Create a car collection with some fields
  const carCollection = db.collection("car");
  const cars = [
    {
      model: "Model S",
      company: "Tesla",
      mileage: 60000,
      color: "Black",
      owner: "John",
    },
    {
      model: "Fiesta",
      company: "Ford",
      mileage: 30000,
      color: "Blue",
      owner: "Jane",
    },
    {
      model: "Camry",
      company: "Toyota",
      mileage: 50000,
      color: "Red",
      owner: "Bob",
    },
    {
      model: "Accord",
      company: "Honda",
      mileage: 40000,
      color: "White",
      owner: "Alice",
    },
  ];
  // Insert multiple documents into the car collection
  carCollection.insertMany(cars, (err, result) => {
    if (err) throw err;
    // Query the car collection to find employees with more than a specific salary
    const minMileage = 50000;
    carCollection
      .find({ mileage: { $gt: minMileage } })
      .toArray((err, docs) => {
        if (err) throw err;
        console.log(`Cars with mileage greater than ${minMileage}:`);
        console.log(docs);
        // Close the MongoDB connection
        client.close();
      });
  });
});
