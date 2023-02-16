const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(express.static('../../build'));

app.get('/', function (req, res) {
   res.sendFile('../../build/index.html');
});

app.get('/api/users', (req, res) => {
   fs.readFile('sample-data.json', 'utf-8', (err, data) => {
      const users = JSON.parse(data);
      res.json(users);
   });
});

function deleteUser(id, cb) {
   fs.readFile('sample-data.json', 'utf8', (err, data) => {
      let users = JSON.parse(data);
      users = users.filter((el) => el.id != id);
      fs.writeFile('sample-data.json', JSON.stringify(users), (err) => {
         if (err) return cb(err);
         cb(null, { succes: true });
      });
   });
}

app.post('/api/user', (req, res) => {
   const newUser = req.body;
	console.log(req)
   fs.readFile('sample-data.json', 'utf8', (err, data) => {
      let users = JSON.parse(data);
		users.push(newUser)
      fs.writeFile('sample-data.json', JSON.stringify(users), (err) => {
         if (err) throw new Error('Something went wrong');
         res.json(newUser);
      });
   });
});

app.delete('/api/user/:id', (req, res) => {
   const userId = req.params.id;
   deleteUser(userId, (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(result);
   });
});

app.listen(3001, () => {
   console.log('listening');
});
