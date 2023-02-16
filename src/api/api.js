const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(express.static("../../build"));

const dataPath = "sample-data.json";

app.get("/api/users", (req, res) => {
  getAll(res);
});

app.post("/api/user", (req, res) => {
  const newUser = req.body;
  addUser(res, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

app.delete("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  deleteUserById(userId, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

app.listen(3001, () => {
  console.log("listening");
});



function getAll(res) {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
      const users = JSON.parse(data);
      res.json(users);
   });
}

function deleteUserById(id, cb) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
      let users = JSON.parse(data);
      users = users.filter((el) => el.id != id);
      fs.writeFile(dataPath, JSON.stringify(users), (err) => {
         if (err) return cb(err);
         cb(null, { succes: true });
      });
   });
}

function addUser(res, cb){
  fs.readFile(dataPath, 'utf8', (err, data) => {
      let users = JSON.parse(data);
        users.push(newUser)
      fs.writeFile(dataPath, JSON.stringify(users), (err) => {
         if (err) throw new Error('Something went wrong');
         res.json(newUser);
      });
   });
}