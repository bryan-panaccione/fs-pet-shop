const http = require("http");
const fs = require("fs");
const express = require("express");

const port = process.env.port || 8080;

const DATAPATH = "./pets.json";

function validatePet(pet) {
  const ageFactor = Number.isNaN(parseInt(pet.age));
  if (!ageFactor && pet.kind && pet.name) {
    return true;
  } else {
    return false;
  }
}

const app = express();

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

app.patch("/pets/:index", (req, res) => {
  const { index } = req.params;
  let ageIntBool = typeof req.body.age === "number";
  if (!req.body.age) ageIntBool === true;

  if (!isNaN(index) && ageIntBool) {
    let updateInfo = req.body;

    fs.readFile(DATAPATH, "utf-8", (err, data) => {
      let parsedData = JSON.parse(data);
      if (err) throw err;
      for (var key in parsedData[index]) {
        if (updateInfo[key]) {
          parsedData[index][key] = updateInfo[key];
        }
      }
      fs.writeFile(DATAPATH, JSON.stringify(parsedData), (err2, data2) => {
        if (err2) throw err2;
        res.set("Content-Type", "text/plain").send(parsedData);
      });
    });
  } else {
    res
      .set("Content-Type", "text/plain")
      .status(404)
      .send("invalid age, or index");
  }
});

app.delete("/pets/:index", (req, res) => {
  const { index } = req.params;
  fs.readFile(DATAPATH, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const petSelected = parsedData[index];
    parsedData.splice(index, 1);
    if (petSelected) {
      fs.writeFile(DATAPATH, JSON.stringify(parsedData), (err2, data2) => {
        if (err2) throw err2;
        res
          .set("Content-Type", "application/json")
          .send(JSON.stringify(petSelected));
      });
    } else {
      res
        .set("Content-Type", "text/plain")
        .status(404)
        .send("Your request doesnt exist you silly goose");
    }
  });
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
