const {Success, ErrorSend} = require("../service/SuccessAndError");
const file1 = require('path').resolve(__dirname, '..')
const jwt = require('jsonwebtoken');
const fs = require("fs")
const privateKey = fs.readFileSync('private.key', "utf8");
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const registrationUser = async (req, res, next) => {
    try {
        const file = req.file
        if (file.mimetype !== "application/pdf") {
            return res.status(404).send({code: 404, error: {}, message: "File not pdf"})
        }
        fs.rename(file1 + `/public/pdf/${file.filename}`, file1 + `/public/pdf/${file.filename}.pdf`, (e) => {
            Promise.all([prisma.user.create({data:{...req.body, isChecked: false, doc: file.path + ".pdf"}})]).then(r => {
                return res.status(200).send({code: 200, user: r[0]})
            }).catch(e => {
                return res.status(404).send({code: 404, error: e, message: e.message})
            })
        });
    } catch (e) {
        return res.status(404).send({code: 404, error: e, message: e.message})
    }
}

const loginUser = async (req, res) => {
    try {
        let {email, password} = req.body
        prisma.user.findFirst({where: {AND:{email, password}}}).then(r => {
            if (r){
                const token = jwt.sign({
                    User: r?.id,
                    email: r?.email,
                    role: r?.role,
                    date: new Date(),
                }, privateKey, {});
                res.status(200).send(Success(200, {token: token, date: new Date()}, "Ok"))
            } else {
                res.status(401).send(ErrorSend(401, {}, "user not found"))
            }
        }).catch(e => {
            console.log(e)
            res.status(404).send(ErrorSend(404, e, e.message))
        })
    } catch (e) {
        res.status(400).send(ErrorSend(400, e, e.message))
    }
}

module.exports = {
    registrationUser,
    loginUser
}
