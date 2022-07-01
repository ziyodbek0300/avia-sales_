const jwt = require('jsonwebtoken');
const fs = require("fs")
const privateKey = fs.readFileSync('private.key', "utf8");
const models = require("../models")
const userRole = require("../constants/UserRole")

const TokenVerify = (req, res, next) => {
    const authHeader = req?.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
        jwt.verify(token, privateKey, {}, async (e, d) => {
            try {
                let a = !e ? d : null
                switch (a["role"]) {
                    case userRole.agent:
                    case userRole.admin:
                    case userRole.client: {
                        try {
                            if (a["role"]) {
                                let findUser = await models.User.findOne({
                                    where: {
                                        email: a && a.email,
                                        role: a && a.role
                                    }
                                })
                                req.user = findUser && findUser.dataValues
                                return next()
                            }
                            return next()
                        } catch (e) {
                            return next(e)
                        }
                    }
                    default: {
                        next()
                    }
                }
            } catch (e) {
                req.user = null
                return next()
            }
        })
    } catch (e) {
        return next()
    }
}

module.exports = TokenVerify