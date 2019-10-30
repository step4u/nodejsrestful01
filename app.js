const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use('/users', require('./api/users'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});