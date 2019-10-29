const express = require('express');
const router = express.Router();

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
];

router.get('/', (req, res) => {
    res.send('Hello World!\n');
});
  
router.get('/', (req, res) => {
    return res.json(users);
});
  
router.get('/:id', (req, res) => {
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
  
router.delete('/:id', (req, res) => {
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
  
router.post('/', (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({error: 'Incorrenct name'});
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId
    }, 0) + 1;

    const newUser = { id : id, name :  name };
    users.push(newUser);

    return res.status(201).json(users);
});

module.exports = router;
