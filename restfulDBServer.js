const express = require("express");
const { Pool } = require("pg");

const port = process.env.port || 8080;

const DATAPATH = "./pets.json";

const pool = new Pool({
  database: "petshopdb",
  user: "bryan",
  password: "password",
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
///////////////
const authList = ["Basic YWRtaW46bWVvd21peA==", "Basic YW1hbmRhOmJ1dHRoZWFk"];
app.use((req, res, next) => {
  console.log(req.headers);
  if (authList.includes(req.headers.authorization)) {
    next();
  } else {
    res.sendStatus(401);
  }
  //console.log(req.headers.authorization);
});

////////////////
app.get("/pets", (req, res) => {
  pool
    .query("SELECT * FROM pets")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.sendStatus(500));
});
///////////////
app.get("/pets/:index", (req, res) => {
  const { index } = req.params;
  pool
    .query("SELECT * FROM pets WHERE id = $1", [index])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.sendStatus(500));
});
///////////////
app.post("/pets", (req, res) => {
  const { age, name, kind } = req.body;
  let ageBool = typeof age === "number";

  pool
    .query(
      "INSERT INTO pets(age, name, kind) VALUES ($1, $2, $3) RETURNING *",
      [age, name, kind]
    )
    .then((result) => {
      if (name && kind && age && ageBool) {
        res.send(result.rows[0]);
      } else {
        res.send("Post a valid pet");
      }
    })
    .catch((err) => res.sendStatus(500));
});
///////////////
app.patch("/pets/:index", (req, res) => {
  const { age, name, kind } = req.body;
  const { index } = req.params;
  const patchQuery = `
  UPDATE pets SET
    age = COALESCE($1, age),
    name = COALESCE($2, name),
    kind = COALESCE($3, kind)
  WHERE id = $4
  RETURNING *`;
  pool
    .query(patchQuery, [age, name, kind, index])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.sendStatus(500));
});
/////////////////

// let ageBool = typeof(age) === 'number';

//     if(name && kind && age && ageBool){

app.delete("/pets/:index", (req, res) => {
  const { index } = req.params;
  pool
    .query("DELETE FROM pets WHERE id = $1 RETURNING *", [index])
    .then((result) => {
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => res.sendStatus(500));
});

/////////////////
app.use((req, res, next) => {
  res.status(404).send("bingbong");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
