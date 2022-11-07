const express = require("express");
const path = require("path");
const dataBase = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET method for opening page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET method for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(dataBase.slice(1));
});

app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, dataBase);
  res.json(newNote);
});
const createNote = (body, notesarray) => {
  const newNote = body;
  if (!Array.isArray(notesarray)) {
    notesarray = [];
  }
  if (notesarray.length === 0) {
    notesarray.push(0);
  }
  body.id = notesarray.length;
  notesarray[0]++;
  notesarray.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesarray, null, 2)
  );
  return newNote;
};

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, dataBase);
  res.json(true);
});

const deleteNote = (id, notesarray) => {
  for (let i = 0; i < notesarray.length; i++) {
    let note = notesarray[i];
    if (note.id == id) {
      notesarray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesarray, null, 2)
      );
      break;
    }
  }
};

// App listenening at http://localhost:3001
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
