const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const axios = require("axios");

// Where we will keep faces
let faces = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/faces", (req, res) => {
  res.render("faces.html");
});

app.get("/faces-json", (req, res) => {
  res.send(faces);
});

app.get("/winners", (req, res) => {
  res.render("winners.html");
});

app.post("/face-staging", (req, res) => {
  const face = req.body;
  axios
    .get("https://homol.spidx.app:8096/collection/" + face.guid)
    .then((res) => {
      faces.push(res.data['biometricPackage']['biometricList'][0]["content"]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/face", (req, res) => {
  const face = req.body;
  axios
    .get("https://app.spidx.app:8096/collection/" + face.guid)
    .then((res) => {
      faces.push(res.data['biometricPackage']['biometricList'][0]["content"]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/clearfaces", (req, res) => {
  faces = [];
  res.send("Removed all faces");
});

app.listen(port, () => console.log(`Running on port ${port}!`));