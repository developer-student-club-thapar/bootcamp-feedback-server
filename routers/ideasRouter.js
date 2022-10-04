const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

//route to get notes where event is idea
router.get("/ideas", async (req, res) => {
  try {
    const notes = await Note.find({ event: "ideas" }, { passphrase: 0 });
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send(e.message);
  }
});

module.exports = router;
