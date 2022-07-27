const model = require("../models");
const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");


const deleteUser = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
                // return next()
            } else {
                return res.status(401).send(ErrorSend(401, {}, "no user"))
            }
        }
        Promise.all([model.User.destroy({where: {id: req.params.id}})])
            .then(r => {
                if (r[0]===1) {
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

const acceptAgent = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
                // return next()
            } else {
                return res.status(401).send(ErrorSend(401, {}, "no user"))
            }
        }
        Promise.all([model.User.update({isChecked: true}, {where: {id: req.params.id}},)])
            .then(r => {
                if (r[0][0] === 1) {
                    return res.status(200).send(Success(200, true, "ok"))
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

const getAllUser = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
                // return next()
            } else {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            }
        }
        Promise.all([model.User.findAll()])
            .then(r => {
                let result = {
                    [userRole.admin]: [], [userRole.agent]: [], newAgent: [],
                }
                r[0].map(item => {
                    console.log(item.dataValues)
                    if (item.dataValues.role === userRole.admin) {
                        result = {
                            ...result, [userRole.admin]: [...result[userRole.admin], item.dataValues]
                        }
                        return 1;
                    } else if (item.dataValues.role === userRole.agent && item.dataValues.isChecked) {
                        result = {
                            ...result, [userRole.agent]: [...result[userRole.agent], item.dataValues]
                        }
                        return 1;
                    } else if (item.dataValues.role === userRole.agent && !item.dataValues.isChecked) {
                        result = {
                            ...result, newAgent: [...result.newAgent, item.dataValues]
                        }
                        return 1;
                    }
                })
                return res.status(200).send(Success(200, result, "ok"))
            })
            .catch(e => {
                return res.status(404).send({code: 404, error: e, message: e.message})
            })
    } catch (e) {
        return res.status(505).send({code: 505, error: e, message: e.message})
    }
}

const getMe = async (req, res) => {
    if (req.user) {
        res.status(200).send(Success(200, req.user, "ok"))
    } else {
        res.status(401).send(ErrorSend(401, {}, "not found"))
    }
}


module.exports = {
    getAllUser, getMe, acceptAgent, deleteUser
}