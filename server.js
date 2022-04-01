const express = require('express');
const app = express();

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
        noteTextArray.forEach(notes => {
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

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API Server now on port 3001!`);
});