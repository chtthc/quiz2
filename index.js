const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000;
const uri = process.env.URI; // Load MongoDB URI from environment variable

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define a schema for s24students collection
    const studentSchema = new mongoose.Schema({
      myName: { type: String, required: true },
      mySID: { type: String, required: true, unique: true }
    });

    // Create a Mongoose model
    const Student = mongoose.model('s24students', studentSchema);

    // Serve HTML form on root route
    app.get('/', (req, res) => {
      res.sendFile(__dirname + "/form.html");
    });

    // Handle POST request to add student data
    app.post('/', (req, res) => {
      // Hardcoding your name and student ID
      const newStudent = new Student({
        myName: "Kelly Chan",
        mySID: "300385384"
      });

      // Save the document to MongoDB
      newStudent.save((err, savedStudent) => {
        if (err) {
          console.error('Error saving student:', err);
          res.status(500).send('Error saving student');
        } else {
          console.log('Document added successfully:', savedStudent);
          res.send(`<h1>Document Added Successfully</h1><p>Name: ${savedStudent.myName}</p><p>SID: ${savedStudent.mySID}</p>`);
        }
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
