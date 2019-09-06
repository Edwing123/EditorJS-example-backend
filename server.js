const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const imageRouter = require('./source/routes/router');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', imageRouter);
app.use('/public', express.static(__dirname + '/source/assets/'));


// listening on port
app.listen(4000, () => {
  console.log(`on port ${4000}`);
});