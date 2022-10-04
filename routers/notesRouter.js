const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({}, { passphrase: 0 });
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

router.get("/:event", async (req, res) => {
  try {
    const notes = await Note.find(
      { event: `${req.params.event}` },
      { passphrase: 0 }
    );
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

router.post("/notes", async (req, res) => {
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

router.delete("/notes", async (req, res) => {
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
