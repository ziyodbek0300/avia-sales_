const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");
const {PrismaClient} = require("@prisma/client")
const axios = require("axios");
const qs = require("qs");
const {parseString} = require("xml2js");
const starConst = require("../constants/starConst");
const sprice = require("../constants/sprice");
const hprice = require("../constants/hprice");
const roomNames = require("../constants/room");
const _ = require("lodash");
const htplace = require("../constants/hotelsTownLists");
const prisma = new PrismaClient()


const searchTour = async (req, res, next) => {
    Promise.all([
        axios.post(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=auth`,
            qs.stringify({
                login: "ContinenTashtXML",
                passwordDigest: "DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D"
            }),
            {headers: {'content-type': 'application/x-www-form-urlencoded'}}),
    ])
        .then(r => {
            parseString(r[0].data, function (err, result) {
                const token = result.Response.Data[0].Result[0]['$'].partner_token
                Promise.all([
                        axios.get(`http://smartsys.intouch.ae/incoming/export/default.php?samo_action=reference&partner_token=${token}&form=http://samo.travel&type=hotel&state=${req.params.townId}`),
                ])
                    .then(r => {
                        parseString(r[0].data, function (err, result) {
                            const newData = result.Response.Data[0].hotel
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
                                        ...item,
                                        starCount: a,
                                        sprice: sprice1
                                    }
                                }).filter(e => {
                                    return e.dataa !== null && e.sprice !== null
                                }).map(r => {
                                    const hp = hprice.filter(h => {
                                        console.log(h.hotel,r.inc)
                                        return h.hotel === r.inc
                                    }).map(r => {
                                        let name = {
                                            name: "",
                                            lname: ""
                                        };
                                        for (let i = 0; i < roomNames.length; i++) {
                                            let a = roomNames[i]
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
                                    console.log(hp)
                                    let changedData = _.unionBy(hp, function (e) {
                                        return e.room
                                    }).map(r => {
                                        let name = {
                                            name: "",
                                            lname: ""
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
                                        ...r,
                                        dataa: changedData
                                    }
                                })
                            res.send(newData)
                        });

                    })
                    .catch(e => {
                        res.status(404).send(ErrorSend(404, e, e.message))
                    })
            });
        })
        .catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
}

const del = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
                // return next()
            } else {
                return res.status(401).send(ErrorSend(401, {}, "no user"))
            }
        }
        Promise.all([prisma.flight.deleteMany({where: {id: +req.params.id}})])
            .then(r => {
                if (r[0]?.count > 0) {
                    return res.status(200).send(Success(200, true, "ok"))
                } else {
                    return res.status(404).send(ErrorSend(404, {}, "not found"))
                }
            })
            .catch(e => {
                console.log(e)
                return res.status(404).send(ErrorSend(404, e, e.message))
            })
    } catch (e) {

    }
}

const getOne = async (req, res, next) => {
    try {

        prisma.flight.findUnique({where: {id: req.params.id}})
            .then(r => {
                return res.status(200).send(Success(200, r, "ok"))
            })
            .catch(e => {
                return res.status(404).send(ErrorSend(404, e, e.message))
            })
    } catch (e) {
        return res.status(500).send({code: 500, error: e, message: e.message})
    }
}

const getAll = async (req, res, next) => {
    try {
        prisma.flight.findMany({})
            .then(r => {
                return res.status(200).send(Success(200, r, "ok"))
            })
            .catch(e => {
                return res.status(404).send({code: 404, error: e, message: e.message})
            })
    } catch (e) {
        return res.status(505).send({code: 505, error: e, message: e.message})
    }
}

const update = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            } else {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            }
        }
        prisma.flight.update({where: {id: +req.params.id}, data: req.body}).then(r => {
            res.status(200).send(Success(200, r, "ok"))
        }).catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
    } catch (e) {
        res.status(500).send(ErrorSend(500, e, e.message))
    }
}

const addNew = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            } else {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            }
        }
        prisma.flight.create({data: req.body}).then(r => {
            res.status(200).send(Success(200, r, "ok"))
        }).catch(e => {
            console.log(e)
            res.status(404).send(ErrorSend(404, e, e.message))
        })
    } catch (e) {
        res.status(500).send(ErrorSend(500, e, e.message))
    }
}

module.exports = {
    getAll, getOne, del, update, addNew, searchTour
}
