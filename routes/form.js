var express = require('express');
var router = express.Router();
var path = require('path');
const request = require('request');
var utils = require('lockit-utils');
var config = require('../config.js');


router.get('/', utils.restrict(config) , (req, res) => {
    res.render('../views/form',{user: req.session.name});
});

router.post('/', utils.restrict(config), (req, res) => {
    post2Couch(req.body);
    res.render('../views/principal');
});

function post2Couch(dato){
    request.post({
        headers: {'content-type' : 'application/json'},
        url:     config.dbname,
        body:    JSON.stringify(dato)
    }, (error, response, body) =>{
        console.log(body);
        body = JSON.parse(body);
        console.log(body);
        return body.ok
    });

}


module.exports = router;
