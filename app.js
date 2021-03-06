if(process.env.NODE_ENV !== 'production'){
  require('dotenv/config');
}

//required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Note = require("./models/Notes");
const mongoSanitize = require('express-mongo-sanitize');
const https = require('https');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT; 
const cors = require('cors');
const { count } = require('console');


const app = express();

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

app.use(cors({
  origin: '*'
}));

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
    const notes = await Note.find({}, { passphrase: 0 });
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
    res.statusCode = 500;
    res.send(e.message);
  }
});

app.delete("/",async(req,res)=>{
  try{
    const {passphrase} = req.body;
    const sentNote = await Note.findById(req.body._id); 
    if(sentNote.passphrase === passphrase){
      await Note.remove(sentNote);
      res.send('Deleted Successfully')
    }else{
      res.send('Incorrect passphrase'); 
    }
  }catch(e){
    console.log(e,'Error in deleting note'); 
  }
})

// app.delete("/deleteall/:pass", async(req,res)=>{
//   try{
//     if(req.params.pass === "dsc"){
//       await Note.deleteMany({});
//       res.send('all records deleted'); 
//     }else{
//       res.send('wrong pass'); 
//     }
//   }catch(e){
//     console.log(e); 
//     res.send('error in deleting all records'); 
//   }
// })



app.get("*", (req, res)=>{
    res.send("Page doesn't exist");
}); 

if(process.env.NODE_ENV !== 'production'){
    app.listen(PORT || 3000, () => {
    console.log(`Serving on port ${PORT}`);
  });
} else{
  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
    },
    app
  )
  sslServer.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));
}






