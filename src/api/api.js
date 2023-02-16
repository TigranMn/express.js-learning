const express = require("express");
const bodyParser = require("body-parser");
const { getAll, deleteUserById, addUser } = require("./apiUtils");

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
