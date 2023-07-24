// MongoDB
// Implement a Node js applica5on to connect with the MongoDB for performing the below opera5ons Create a database and add Student collec5on with the fields- Sid, Name, Subject, Branch, and Mari Add mul5ple documents with student data Sort (in ascending order) the student details with marks and display them in the console window.

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://raj:123%40Rbpmr@cluster0.oiwrogf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
(async () => {
  try {
    await client.connect();
    // Create a database
    const db = client.db("School");
    // Create a 'Student' collection
    const studentCollection = db.collection("Student");
    // Add multiple documents with student data
    const students = [
      { Sid: 1, Name: "Raj", Subject: "Math", Branch: "CS", Marks: 85 },
      { Sid: 2, Name: "Gourav", Subject: "Math", Branch: "CS", Marks: 90 },
      { Sid: 3, Name: "Vivek", Subject: "Math", Branch: "CS", Marks: 95 },
    ];
    const insertResult = await studentCollection.insertMany(students);
    console.log("Inserted students:", insertResult.insertedCount);
    // Sort the student details by marks (ascending order) and display them in the console window
    const sortedStudents = await studentCollection
      .find()
      .sort({ Marks: 1 })
      .toArray();
    console.log("Sorted students by marks (ascending):", sortedStudents);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
})();
