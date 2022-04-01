const express = require('express');
const app = express();

const { notes } = require('./data/notes');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(3001, () => {
    console.log(`API Server now on port 3001!`);
});