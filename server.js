const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files from "public" directory
app.use(express.static('public'));

// Route to serve quiz questions
app.get('/questions', (req, res) => {
    fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load questions" });
        } else {
            res.json({ questions: JSON.parse(data) });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});