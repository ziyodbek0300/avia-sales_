const express = require('express');
const axios = require("axios");
const {ErrorSend} = require("../service/SuccessAndError");
const router = express.Router();
const parseString = require('xml2js').parseString;
const qs = require("qs")
const _ = require("lodash")
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', {title: 'express'});
});

router.post('/', async function (req, res, next) {
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

router.post('/getHotels/:townId', async function (req, res, next) {
    Promise.all([
        axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`,
            qs.stringify({
                login: "ContinenTashtXML",
                passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
            }),
            {headers: {'content-type': 'application/x-www-form-urlencoded'}}),
        axios.get('http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&form=http://samo.travel&type=star')

        // axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&form=http://samo.travel&type=currentstamp`)
    ])
        .then(r => {
            parseString(r[1].data, function (err, result) {
                const stars = result.Response.Data[0].star.map(e => {
                    return e['$']
                })
                parseString(r[0].data, function (err, result) {
                    const token = result.Response.Data[0].Result[0]['$'].partner_token
                    Promise.all([axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotel&town=${req.params.townId}`)])
                        .then(r => {
                            parseString(r[0].data, function (err, result) {
                                const newData = result.Response.Data[0].hotel
                                    .filter(e => {
                                        return e['$'].status !== 'D'
                                    })
                                    .map(r => {
                                        let a = 0
                                        for (let i = 0; i < stars.length; i++) {
                                            if (stars[i].inc == r["$"].star) {
                                                a = stars[i].lname
                                                break;
                                            }
                                        }
                                        return {
                                            ...r['$'],
                                            starCount: a
                                        }
                                    })
                                res.send(newData)
                            });
                        })
                        .catch(e => {
                            res.status(404).send(ErrorSend(404, e, e.message))
                        })
                });
            });

        })
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
});

router.post('/getHotelsPrice/:townId', async function (req, res, next) {
    Promise.all([
        axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`,
            qs.stringify({
                login: "ContinenTashtXML",
                passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
            }),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        ),
    ])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([
                    axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotelsalepr&town=${req.params.townId}`),
                ])
                    .then(res1 => {
                        parseString(res1[0].data, function (err, result) {
                            res.send(result)
                        });
                    })
                    .catch(e => {
                        res.status(404).send(ErrorSend(404, e, e.message))
                    })
            })
        })
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
})
router.post('/getPrice/:hotelId', async function (req, res, next) {
    Promise.all([
        axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`,
            qs.stringify({
                login: "ContinenTashtXML",
                passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
            }),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        ),
    ])
        .then(r => {
            // parseString(r[1].data, function (err, result11) {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([
                    axios.get(
                        `http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotelsalepr&hotel=${req.params.hotelId}`
                    ),
                    axios.get(
                        `http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=room&hotel=${req.params.hotelId}`
                    ),
                    axios.get(
                        `http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=htplace&hotel=${req.params.hotelId}`
                    )
                ])
                    .then(res1 => {
                        parseString(res1[0].data, function (err, result) {
                            let newData = result.Response.Data[0].hprice.filter(e => {
                                return e['$'].status !== 'D'
                            }).map(r => r['$'])
                            parseString(res1[1].data, function (err, result) {
                                const newData1 = result.Response.Data[0].room.filter(e => {
                                    return e['$'].status !== 'D'
                                }).map(r => r['$'])
                                newData.map(r => {
                                    let name = {
                                        name: "",
                                        lname: ""
                                    };
                                    for (let i = 0; i < newData1.length; i++) {
                                        let a = newData1[i]
                                        if (a.inc === r.room) {
                                            name = {
                                                name: a.name,
                                                lname: a.lname,
                                            }
                                            break;
                                        }
                                    }
                                    r.name = name.name
                                    r.lname = name.lname
                                    return r
                                })
                                let changedData = _.unionBy(newData, function (e) {
                                    return e.room
                                })
                                parseString(res1[2].data, function (err, result) {
                                    const newData2 = result.Response.Data[0].htplace.filter(e => {
                                        return e['$'].status !== 'D'
                                    }).map(r => r['$'])
                                    changedData.map(r => {
                                        let name = {
                                            name: "",
                                            lname: ""
                                        };
                                        for (let i = 0; i < newData2.length; i++) {
                                            let a = newData2[i]
                                            if (a.inc === r.htplace) {
                                                name = a
                                                break;
                                            }
                                        }
                                        r.dataa = name
                                        return r
                                    })
                                    res.send(changedData)
                                })
                            });
                        });

                    })
                    .catch(e => {
                        res.status(404).send(ErrorSend(404, e, e.message))
                    })
                // })
            })
        })
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
})

module.exports = router;
