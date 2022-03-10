const http = require("http");
const fs = require("fs");
const express = require("express");
const PDFParser = require("pdf2json");
const { Pool } = require("pg");

const port = process.env.port || 8080;

const DATAPATH = "./pets.json";

const pool = new Pool({
  database: "petshopdb",
  user: "bryan",
  password: "password",
});

const petId = 2;

// pool.query("SELECT * FROM pets WHERE id = $1", [petId], (err, result) => {
//   console.log(result.rows);
// });

pool.query("SELECT * FROM pets", (err, result) => {
  console.log(result.rows);
});

function validatePet(pet) {
  const ageFactor = Number.isNaN(parseInt(pet.age));
  if (!ageFactor && pet.kind && pet.name) {
    return true;
  } else {
    return false;
  }
}

const app = express();

//Dont forget these, express got issues
app.use(express.json());
app.use(express.urlencoded());

// GET Logic

app.get("/pets", (req, res) => {
  fs.readFile(DATAPATH, "utf-8", (err, data) => {
    if (err) throw err;
    res.set("Content-Type", "application/json").send(data);
  });
});

app.get("/pets/:index", (req, res) => {
  //index in the curlys needs to match variable above in get after :
  //with brackets around index, console log of index is string 2
  //without brackets console log index is an object with index : '2'
  //WHY?
  const { index } = req.params;
  fs.readFile(DATAPATH, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const petSelected = parsedData[index];
    if (petSelected) {
      res
        .set("Content-Type", "application/json")
        .send(JSON.stringify(petSelected));
    } else {
      res
        .set("Content-Type", "text/plain")
        .status(404)
        .send("Your request doesnt exist you silly goose");
    }
  });
});

//Post Logic
app.post("/pets", (req, res) => {
  const newPet = req.body;
  if (!validatePet(newPet)) {
    res.send("Provide a valid pet");
  } else {
    fs.readFile(DATAPATH, "utf-8", (err, data) => {
      const dataParsed = JSON.parse(data);
      if (err) throw err;
      dataParsed.push(newPet);
      fs.writeFile(DATAPATH, JSON.stringify(dataParsed), (err2, data2) => {
        if (err2) throw err2;
        res.send(JSON.stringify(dataParsed));
      });
    });
  }
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
