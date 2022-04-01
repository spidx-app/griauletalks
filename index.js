const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const request = require('request');


// Where we will keep faces
let faces = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

app.post('/face', (req, res) => {
    const face = req.body;
    console.log("teste")
    request('https://api.spidx.app:8096/collection/' + face.guid, { json: true }, (err, res, body) => {
        console.log(body);
        if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);
        }
    );
    console.log("teste2")
    // Output the face to the console for debugging
    // console.log(face);
    faces.push(face.guid);

    res.send('face is added to the database');
});

app.get('/faces', (req, res) => {
    res.json(faces);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
