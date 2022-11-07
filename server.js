const express = require('express');
const path = require('path');
const dataBase = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET method for opening page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET method for note page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);



// App listenening at http://localhost:3001
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});