const express = require('express');
const app = express();

app.use(body-parser.json());
app.use(body-parser.urlencoded({ extended: true }));

let users = [
    {
      id: 1,
      name: 'alice'
    },
    {
      id: 2,
      name: 'bek'
    },
    {
      id: 3,
      name: 'chris'
    }
  ]

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}

app.get('/', (req, res) => {
  res.send('Hello World!\n');
 });

 app.get('/users', (req, res) => {
     return res.json(users);
 });

 app.get('/users/:id', (req, res) => {
     const id = parseInt(req.params.id);
     if (!id) {
         return res.status(400).json({error: 'Incorrect ID'});
     }
     //console.log(id);
     let user = users.filter(user => user.id === id);
     // console.log(user);
     if (isEmpty(user)) {
         return res.status(404).json({error: 'Unknown user'});
     }
    return res.json(user);
 });

 app.delete('/users/:id', (req, res) => {
     const id = parseInt(req.params.id);
     if (!id) {
        return res.status(400).json({error: 'Incorrect ID'});
    }

    const idx = users.findIndex(user => user.id === id);
    if (idx === -1) {
        return res.status(404).json({error: 'Unknown user'});
    }
    users.splice(idx, 1);

    return res.status(204).send()
 });

app.post('/users', (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({error: 'Incorrenct name'});
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId
    }, 0);

    const newUser = { id : id, name :  name };
    users.push(newUser);

    return res.status(201).json(users);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});