const {Success, ErrorSend} = require("../service/SuccessAndError");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllAgents = async (req, res, next) => {
    try {
        Promise.all([prisma.user.findMany({where: {role:"agent"},include:{
            Order:{
                include:{
                    passager:true
                }
            },
            }})])
            .then(r => {
                return res.status(200).send(Success(200, r, "ok"))
            })
            .catch(e => {
                return res.status(404).send(ErrorSend(404, e, e.message))
            })
    } catch (e) {

    }
}
// const deleteUser = async (req, res, next) => {
//     try {
//         Promise.all([prisma.user.deleteMany({where: {id: +req.params.id}})])
//             .then(r => {
//                 return res.status(200).send(Success(200, r, "ok"))
//             })
//             .catch(e => {
//                 return res.status(404).send(ErrorSend(404, e, e.message))
//             })
//     } catch (e) {
//
//     }
// }

module.exports = {
    getAllAgents
}
