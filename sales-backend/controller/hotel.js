const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");
const {PrismaClient} = require("@prisma/client")
const axios = require("axios");
const prisma = new PrismaClient()


const searchTour = async (req, res, next) => {
    Promise.all([
        axios.get(`http://localhost:${process.env.PORT}/getHotels/${req.query.regionId}`),
        prisma.flight.findMany({where: {fromId: +req.query.fromId, toId: +req.query.toId}}),
    ])
        .then(r => {
            const hotels = r[0].data
            const flights = r[1]
            res.send(hotels)
        })
        .catch(e => {
            console.log(e)
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
        Promise.all([prisma.hotels.deleteMany({where: {id: +req.params.id}})])
            .then(r => {
                if (r[0]?.count > 0) {
                    return res.status(200).send(Success(200, true, "ok"))
                } else {
                    return res.status(404).send(ErrorSend(404, {}, "not found"))
                }
            })
            .catch(e => {
                return res.status(404).send(ErrorSend(404, e, e.message))
            })
    } catch (e) {

    }
}

const getOne = async (req, res, next) => {
    try {
        console.log(req.params.id)
        // prisma.hotels.findUnique({where: {id: req.params.id}})
        //     .then(r => {
        //         return res.status(200).send(Success(200, r, "ok"))
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         return res.status(404).send(ErrorSend(404, e, e.message))
        //     })
    } catch (e) {
        return res.status(500).send({code: 500, error: e, message: e.message})
    }
}

const getAll = async (req, res, next) => {
    try {
        prisma.hotels.findMany({})
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
        prisma.hotels.update({where: {id: +req.params.id}, data: req.body}).then(r => {
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
        prisma.hotels.create({data: req.body}).then(r => {
            res.status(200).send(Success(200, r, "ok"))
        }).catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
    } catch (e) {
        res.status(500).send(ErrorSend(500, e, e.message))
    }
}

module.exports = {
    getAll, getOne, del, update, addNew
}
