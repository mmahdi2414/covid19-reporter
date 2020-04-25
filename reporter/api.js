const express = require('express');
const log = require('../logger/logger');
const router = express.Router();
const axios = require('axios');
const {validationResult} = require('express-validator');
const errorFormatter = ({ location, msg, param}) => {
    return ` ${param} -> ${msg} `;
  };

router.use(function(req, res, next) {
    log('info' , `new ${req.method} request on ${req.originalUrl}`);
    next();
})
router.use('/', function(req, res, next) {
    if(req.method.toString() !== "GET"){
        log('error' , `${req.method} is not correct for ${req.originalUrl}`);
	    return res.status(400).json({message: "Bad Request (request method error)"});
    }
    next();
});
router.get('/', function(req, res) {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()){
        log('error' , `${errors.array()}`);
	    return res.status(400).json({message: "Bad Request (params error)"});
    }

    axios.get('http://covid19api.xapix.io/v2/locations')
    
    .then(function (response){
        return res.render('home' , {data: response.data.locations});
    })
    .catch(function(error){
        log('error' , error);
	    return res.status(400).json({message: 'Bad Request'});
        
    });
});


module.exports = router;