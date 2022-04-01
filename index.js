const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

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

    request('https://api.spidx.app:8096/collection/' + face.guid, { json: true }, (err, res, body) => {
        console.log(body);
        if (err) {
            return console.log(err);
        }
        console.log(body.url);
        console.log(body.explanation);
        faces.push(body.biometricPackage.biometricList[0]['content']);
    });
    

    res.send('face is added\n');
});

app.get('/faces', (req, res) => {
    res.json(faces);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
