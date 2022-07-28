const express = require('express');
const axios = require("axios");
const router = express.Router();
const parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'express'});
});

router.post('/', function (req, res, next) {
    Promise.all([axios.get("http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&form=http://samo.travel&type=currentstamp")])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                res.send(result)
            });
        })
        .catch(r => {

        })
});

module.exports = router;
