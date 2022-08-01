const model = require("../models");
const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");

const getAll = async  (req,res,next)=>{
    try {
        // console.log(model.Ticket)
        if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            } else {
                return res.status(404).send(ErrorSend(404, {}, "no user"))
            }
        }
        Promise.all([model.Ticket.findAll({})])
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

module.exports = {
    getAll
}