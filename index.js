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
app.use(express.static(__dirname + '/'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/faces', (req, res) => {
    res.render('faces')
});

app.get('/faces-json', (req, res) => {
    res.send(faces)
});

app.post('/face', (req, res) => {
    const face = req.body;

    try {
        request('https://api.spidx.app:8096/collection/' + face.guid, { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            if (body.biometricPackage) {
                faces.push(body.biometricPackage.biometricList[0]['content']);
            }
        });
        
        res.send('face added!\n');
    }
    catch (error) {
     req.send('Error');   
    }
});

app.post('/clearfaces', (req, res) => {
    faces = [];
    res.send('Removed all faces');
});

app.listen(port, () => console.log(`Running on port ${port}!`));
