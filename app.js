const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');

app.use(cors());
dotenv.config({path:'./config.env'});
require('./database/connection');
app.use(logger('dev'));
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use(express.urlencoded({extended:false}));
app.use('/',require('./routes/index'));

app.listen(port,()=>{console.log(`Server running at http://localhost:${port}`)});