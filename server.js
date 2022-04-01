const fs = require('fs');
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true })); // takes incoming POST data an converts it to key/value pairings
// parse incoming JSON data
app.use(express.json());


const { notes } = require('./data/notes');

function filterByQuery(query, notesArray) {
    let noteTextArray = [];
    let filteredResults = notesArray;
    if (query.noteText) {
        if (typeof query.noteText === 'string') {
            noteTextArray = [query.noteText];
        } else {
            noteTextArray = query.noteText;
        }
        noteTextArray.forEach(note => {
            filteredResults = filteredResults.filter(note => note.noteText.indexOf(text) !== -1);
        });
    }
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

// Accepts the POST routes req.body value the array we want to add the data to
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2) // null: dont edit any of the exisiting data, 2: create white space
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// param route must come after the GET route
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // add notes to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(note); // access data on the server side and do something with it
});

app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
});