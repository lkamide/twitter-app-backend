const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
var express = require('express');
const routes = require('./routes')
var app = express(),
bodyParser = require("body-parser");
const path = require('path');
let reqPath = path.join(__dirname, '../../');//It goes two folders or directories back from given __dirname.

app.use(bodyParser.json());
app.use(express.static(path.join(reqPath, './frontend/build')));
app.use(cors({ origin: true }));

app.use(routes)

app.listen(process.env.PORT || 3000 , function () {
  console.log('Example app listening on port', process.env.PORT|| 3000);
});

