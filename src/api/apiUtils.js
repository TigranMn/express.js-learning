const fs = require('fs');

export function getAll(res) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        const users = JSON.parse(data);
        res.json(users);
     });
}

export function deleteUserById(id, cb) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let users = JSON.parse(data);
        users = users.filter((el) => el.id != id);
        fs.writeFile(dataPath, JSON.stringify(users), (err) => {
           if (err) return cb(err);
           cb(null, { succes: true });
        });
     });
}

export function addUser(res, cb){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let users = JSON.parse(data);
          users.push(newUser)
        fs.writeFile(dataPath, JSON.stringify(users), (err) => {
           if (err) throw new Error('Something went wrong');
           res.json(newUser);
        });
     });
}