import Express from 'express';
import { readFile } from "fs";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ServerTest = Express();
ServerTest.get('/resources/images/exampleMeme.png', (req, res) => {
    readFile(resolve(__dirname, "./resources/images/exampleMeme.png"), (err, data) => {
        if (err) {
            return res.status(500).send('Error reading images data');
        }
        res.set('Content-Type', 'image/png');
        res.send(data);
    });
});
ServerTest.get('/resources/videos', (req, res) => {
    res.send('Hello from the test server!');
});
ServerTest.get('/resources/timeline', (req, res) => {
    res.send('Hello from the test server!');
});
ServerTest.listen(4322, () => {
    console.log('Test server is running on http://localhost:4322');
});
