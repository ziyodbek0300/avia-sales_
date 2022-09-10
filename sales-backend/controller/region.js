const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const del = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            } else {
                return res.status(401).send(ErrorSend(401, {}, "no user"))
            }
        }
        prisma.region.deleteMany({where: {id: +req.params.id}})
            .then(r => {
                return res.status(200).send(Success(200, r, "ok"))
            })
            .catch(e => {
                return res.status(404).send(ErrorSend(404, e, e.message))
            })
    } catch (e) {

    }
}

const getOne = async (req, res, next) => {
    try {
        // if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
        //     if (req.user && req.user.role === userRole.agent) {
        //         return res.status(404).send(ErrorSend(404, {}, "no user"))
        //     } else {
        //         return res.status(401).send(ErrorSend(401, {}, "no user"))
        //     }
        // }
        prisma.region.findUnique({where: {id: +req.params.id}})
            .then(r => {
                if (r) {
                    return res.status(200).send(Success(200, r, "ok"))
                } else {
                    return res.status(404).send(ErrorSend(404, {}, "not found"))
                }
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
        // if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
        //     if (req.user && req.user.role === userRole.agent) {
        //         return res.status(404).send(ErrorSend(404, {}, "no user"))
        //     } else {
        //         return res.status(404).send(ErrorSend(404, {}, "no user"))
        //     }
        // }
        Promise.all([prisma.region.findMany({where: {}})])
            .then(r => {
                return res.status(200).send(Success(200, r[0], "ok"))
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
        prisma.region.update({where: {id: +req.params.id}, data: req.body}).then(r => {
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
        prisma.region.create({data: {...req.body}}).then(r => {
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
