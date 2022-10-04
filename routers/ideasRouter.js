const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

//route to get notes where event is idea
router.get("/ideas", async (req, res) => {
  try {
    const notes = await Note.find({ event: "idea" }, { passphrase: 0 });
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

//check if body has event : idea and create an idea note
router.post("/ideas", async (req, res) => {
  try {
    const note = new Note(req.body);
    if (req.body.event === "idea") {
      await note.save();
      console.log(note);
      res.json(note);
    } else {
      res.send("This note doesnt belong to idea");
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

//delete note
router.delete("/ideas", async (req, res) => {
  try {
    if (
      !(await Note.findOneAndDelete({
        _id: req.body._id,
        passphrase: req.body.passphrase,
      }))
    ) {
      throw new Error("Wrong passphrase");
    }
    res.send("Deleted Successfully");
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

module.exports = router;
