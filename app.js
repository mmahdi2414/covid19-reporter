require('dotenv').config();

const express = require('express');
const body_parser = require('body-parser');
const log = require('./logger/logger');
const reporter = require('./reporter/api');

const port = process.env.PORT || 3000;
const app = express();

app.use(body_parser.json());
app.use(express.json());

 app.use('/' , reporter);

app.use(function(req, res) {
	    log('error' , `url: ${req.url} not found.`);
	    return res.status(404).json({message: `url: ${req.url} Not found.`});
    }
);



app.listen(port , function(){
    log('info',`app started at port ${port}`);
});