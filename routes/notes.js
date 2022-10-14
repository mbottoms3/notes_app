const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET route for all notes
notes.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// GET route for one note
// notes.get("/:note_id", (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile("./db/notes.json");
// });

// POST route to create a note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json("Success");
  } else {
    res.errored("Note not created");
  }
});

module.exports = notes;
