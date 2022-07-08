if(process.env.NODE_ENV !== 'production'){
  require('dotenv/config');
}

//required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Note = require("./models/Notes");
const mongoSanitize = require('express-mongo-sanitize');


app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(mongoSanitize()); 

app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );

//mongodb connection
mongoose.connect(process.env.db_connection, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// routes

app.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const notes = await Note.find({});
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.send("error"); 
  }
});

app.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    console.log(note);
    res.json(note);
  } catch (e) {
    console.log(e);
    res.send("error");
  }
});

app.get("*", (req, res)=>{
    res.send("Page doesn't exist");
}); 

app.listen(PORT || 3000, () => {
  console.log(`Serving on port ${PORT}`);
});
