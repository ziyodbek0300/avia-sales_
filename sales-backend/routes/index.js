const express = require('express');
const axios = require("axios");
const {ErrorSend} = require("../service/SuccessAndError");
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
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
});

router.post('/getHotels/:townId', function (req, res, next) {
    Promise.all([axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`, {
        login: "ContinenTashtXML",
        passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
    }, {headers: {"Content-type": "application/x-www-form-urlencoded"}})])
        .then(r => {
            console.log(r[0].data)
            const token = ""
            Promise.all([axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotel&town=${req.params.townId}`)])
                .then(r => {
                    parseString(r[0].data, function (err, result) {
                        res.send(result)
                    });
                })
                .catch(e => {
                    res.status(404).send(ErrorSend(404, e, e.message))
                })
        })
        .catch()
});

module.exports = router;
