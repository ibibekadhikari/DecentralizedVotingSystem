const express = require("express");
const mongoose = require("mongoose");
const getMethod = require("./getMethod");
const postMethod = require("./postMethod");
const putMethod = require("./putMethod");


//The below command will bring the moongose connection from db folder and run that file within this file. -BIBEK
require("./db/connection");


//Importing all the models.

const port = 3030;


const router = express.Router();

const app = express();
//The below command must be used so that req.body doesn't show undefined because the post was made via json.
app.use(express.json());

var cors = require("cors");
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

app.use(getMethod);
app.use(postMethod);
app.use(putMethod);

app.listen(port,()=> {
    console.log(`The server has been started at PORT:${port} `)
})
