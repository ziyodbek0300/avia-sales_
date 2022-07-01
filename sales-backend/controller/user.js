const model = require("../models");
const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");

const getAllUser = async (req, res, next) => {
    try {
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send({code: 404, error: {}, message: "no user"})
                // return next()
            } else {
                return res.status(401).send({code: 401, error: {}, message: "no user"})
            }
        }
        Promise.all([model.User.findAll()])
            .then(r => {
                let result = {
                    [userRole.admin]: [],
                    [userRole.agent]: [],
                    newAgent: [],
                }
                r[0].map(item => {
                    console.log(item.dataValues)
                    if (item.dataValues.role === userRole.admin) {
                        result = {
                            ...result,
                            [userRole.admin]: [...result[userRole.admin], item.dataValues]
                        }
                        return 1;
                    } else if (item.dataValues.role === userRole.agent && item.dataValues.isCheked) {
                        result = {
                            ...result,
                            [userRole.agent]: [...result[userRole.agent], item.dataValues]
                        }
                        return 1;
                    } else if (item.dataValues.role === userRole.agent && !item.dataValues.isCheked) {
                        result = {
                            ...result,
                            newAgent: [...result.newAgent, item.dataValues]
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
        return res.status(404).send({code: 404, error: e, message: e.message})
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
    getAllUser,
    getMe
}