var bodyParser = require('body-parser')
const app = express();

app.use('/users', require('./api/users'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});