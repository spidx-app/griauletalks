const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const axios = require('axios');


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
    console.log(req.body);

    console.log("teste")
    console.log('http://192.168.0.101:8096/collection/' + face.guid)


    axios.get('http://192.168.0.101:8096/collection/' + face.guid)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
    // request('http://192.168.0.101:8096/collection/' + face.guid, { json: true }, (err, res, body) => {
    //     console.log("1")
    //     if (err) {
    //         console.log("2")
    //         return console.log(err);
    //     }
    //     console.log("3")
    //     console.log(body);
    //     if (body.biometricPackage) {
    //         console.log("4")
    //         console.log("passou aqui agora")
    //         console.log(body);
    //         faces.push(body.biometricPackage.biometricList[0]['content']);
    //     }
    // });

    // res.send('face added!\n');


});

app.post('/clearfaces', (req, res) => {
    faces = [];
    res.send('Removed all faces');
});

app.listen(port, () => console.log(`Running on port ${port}!`));
