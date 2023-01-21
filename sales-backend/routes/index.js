const express = require('express');
const axios = require("axios");
const parseString = require('xml2js').parseString;
const qs = require("qs")
const _ = require("lodash")
const cron = require('node-cron');
const {PrismaClient} = require("@prisma/client")

const router = express.Router();
const prisma = new PrismaClient()

const {ErrorSend} = require("../service/SuccessAndError");
const starConst = require("../constants/starConst");
const htplace = require("../constants/hotelsTownLists");
const sprice = require("../constants/sprice");
const hprice = require("../constants/hprice");
const roomNames = require("../constants/room");
const {hotelsTownLists} = require("../constants/hotelsTownLists");
const {unionBy} = require("lodash");
// const {hotelsTownLists} = require("../constants/hotelsTownLists")

router.get('/', async function (req, res) {
    res.render('index', {title: 'express'});
});

router.get('/url', async function (req, res) {
    res.status(200).redirect(req.body.url)
    // Promise.all([axios.get(req.body.url)])
    //     .then(r => {
    //     })
    //     .catch(e => {
    //         res.status(404).send(ErrorSend(404, e, e.message))
    //     })

});

router.post('/', async function (req, res) {
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

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

// cron.schedule("0 0 */1 * * *", function () {
cron.schedule("*/15 * * * *", async function () {
    const hotels = await prisma.hotels.findMany({})
    hotelsTownLists.map(async (e, index) => {
        const hotel = hotels.find(hotel => hotel.regionId == e.id)
        let result = []
        await Promise.all(e.ids.map(async (item,index) => {
            try {
                await sleep(index*500)
                const a = await axios.post(`http://localhost:${process.env.PORT}/getHotels/${item}`)
                return a.data
            } catch (e) {
                return []
            }
        }))
            .then(res => {
                res.map(r => {
                    if (Array.isArray(r)) {
                        result = [...result, ...r]
                    }
                })
            })

        // console.log(result)
        try {
            if (!hotel) {
                console.log(result)
                await prisma.hotels.create({data: {id: hotel?.id, jsonValue: result, regionId: `${e.id}`}})
            } else {
                console.log(unionBy([...hotel.jsonValue, ...result], (e) => e.inc))
                await prisma.hotels.update({
                    where: {id: hotel?.id},
                    data: {
                        id: hotel?.id,
                        regionId: `${e.id}`,
                        jsonValue: unionBy([...hotel.jsonValue, ...result], (e) => e.inc)
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    })
});

router.get('/getHotels/:townId', async function (req, res) {
    try {
        const hotel = await prisma.hotels.findMany({where: {regionId: +req.params.townId}})
        res.send(hotel[0].jsonValue)
    } catch (e) {
        console.log(e)
        res.status(404).send(ErrorSend(404, e, e.message))
    }
})

router.post('/getHotels/:townId', async function (req, res) {
    // console.log("as")
    Promise.all([axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`, qs.stringify({
        login: "ContinenTashtXML",
        passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
    }), {headers: {'content-type': 'application/x-www-form-urlencoded'}}),])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotel&town=${req.params.townId}`),])
                    .then(async r => {
                        let newData = []
                        parseString(r[0].data, function (err, result) {
                            newData = result.Response.Data[0].hotel
                                .filter(e => {
                                    return e['$'].status !== 'D'
                                })
                                .map(r => {
                                    let item = r["$"]
                                    let a = 0
                                    for (let i = 0; i < starConst.length; i++) {
                                        if (starConst[i].inc == item.star) {
                                            a = starConst[i].lname
                                            break;
                                        }
                                    }
                                    let l2 = sprice.length
                                    let sprice1 = null
                                    for (let i = 0; i < l2; i++) {
                                        let a
                                        try {
                                            a = sprice[i]
                                        } catch (e) {

                                        }
                                        if (a?.hotel === item.inc) {
                                            sprice1 = a
                                            break;
                                        }
                                    }
                                    return {
                                        ...item, starCount: a, // dataa: name,
                                        sprice: sprice1
                                    }
                                })
                                // .filter(e => {
                                //     return e.dataa !== null && e.sprice !== null
                                // })
                                .map(r => {
                                    const hp = hprice.filter(h => {
                                        return h.hotel === r.inc
                                    }).map(r => {
                                        let name = {
                                            name: "", lname: ""
                                        };
                                        for (let i = 0; i < roomNames.length; i++) {
                                            let a = roomNames[i]
                                            if (a.inc === r.room) {
                                                name = {
                                                    name: a.name, lname: a.lname,
                                                }
                                                break;
                                            }
                                        }
                                        r.name = name.name
                                        r.lname = name.lname
                                        return r
                                    })
                                    let changedData = _.unionBy(hp, function (e) {
                                        return e.room
                                    }).map(r => {
                                        let name = {
                                            name: "", lname: ""
                                        };
                                        let l1 = htplace.length
                                        let l2 = sprice.length
                                        for (let i = 0; i < l1; i++) {
                                            let a = htplace[i]
                                            if (a.in === r.htplace) {
                                                name = a
                                                break;
                                            }
                                        }
                                        r.dataa = name
                                        let sprice1 = null
                                        for (let i = 0; i < l2; i++) {
                                            let a
                                            try {
                                                a = sprice[i]
                                            } catch (e) {
                                            }
                                            if (a?.hotel === r.hotel) {
                                                sprice1 = a
                                                break;
                                            }
                                        }
                                        r.sprice = sprice1
                                        return r
                                    })
                                    return {
                                        ...r, dataa: changedData
                                    }
                                })
                            // let a  =Pr
                        });
                        const a = await Promise.all(newData.map(e => {
                            try {
                                return axios.post(`http://localhost:${process.env.PORT}/getPrice/${e.inc}`)
                            } catch (e) {
                                return null;
                            }
                        })).catch(e => {
                            // console.log("asd123")
                        })
                        let response = a.map(r => r.data)
                        res.send(newData.map(e => {
                            let pricee = {}
                            for (let i = 0; i < response.length; i++) {
                                let indexElement = response[i]
                                if (indexElement.length > 0 && e.inc === indexElement[0].hotel) {
                                    pricee = indexElement
                                    break
                                }
                            }
                            return {
                                ...e, price: pricee
                            }
                        }))
                    })
                    .catch(e => {
                        res.status(404).send(ErrorSend(404, e, e.message))
                    })
            });
        })
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
});

router.post('/getHotelsPrice/:townId', async function (req, res) {
    Promise.all([axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`, qs.stringify({
        login: "ContinenTashtXML",
        passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
    }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }),])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotelsalepr&state=${req.params.townId}`),])
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

// fs.write()
// fs.crea
// Promise.all([
//     axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&form=http://samo.travel&type=room`),
// ])
//     .then(r => {
//         parseString(r[0].data, function (err, result) {
//             fs.writeFile("books.json", JSON.stringify(result), (err) => {
//                 if (err)
//                     console.log(err);
//                 else {
//                     console.log("File written successfully\n");
//                     console.log("The written has the following contents:");
//                     console.log(fs.readFileSync("books.txt", "utf8"));
//                 }
//             });
//         })
//     })


router.post('/getPrice/:hotelId', async function (req, res) {
    Promise.all([axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`, qs.stringify({
        login: "ContinenTashtXML",
        passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
    }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }),])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotelsalepr&hotel=${req.params.hotelId}`), axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=room&hotel=${req.params.hotelId}`), // axios.get(
                    //     `http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=htplace&hotel=${req.params.hotelId}`
                    // )
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
                                        name: "", lname: ""
                                    };
                                    for (let i = 0; i < newData1.length; i++) {
                                        let a = newData1[i]
                                        if (a.inc === r.room) {
                                            name = {
                                                name: a.name, lname: a.lname,
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
                                // parseString(res1[2].data, function (err, result) {
                                //     const newData2 = result.Response.Data[0].htplace.filter(e => {
                                //         return e['$'].status !== 'D'
                                //     }).map(r => r['$'])
                                changedData.map(r => {
                                    let name = {
                                        name: "", lname: ""
                                    };
                                    let l1 = htplace.length
                                    let l2 = sprice.length
                                    for (let i = 0; i < l1; i++) {
                                        let a = htplace[i]
                                        if (a.in === r.htplace) {
                                            name = a
                                            break;
                                        }
                                    }
                                    r.dataa = name
                                    let sprice1 = null
                                    for (let i = 0; i < l2; i++) {
                                        let a
                                        try {
                                            a = sprice[i]
                                        } catch (e) {

                                        }
                                        if (a?.hotel === r.hotel) {
                                            sprice1 = a
                                            break;
                                        }
                                    }
                                    r.sprice = sprice1
                                    return r
                                })
                                res.send(changedData)
                                // })
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
