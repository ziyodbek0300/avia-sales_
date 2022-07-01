const model = require("../models")
const {Success, ErrorSend} = require("../service/SuccessAndError");
const file1 = require('path').resolve(__dirname, '..')
const jwt = require('jsonwebtoken');
const fs = require("fs")
const privateKey = fs.readFileSync('private.key', "utf8");

const registrationUser = async (req, res, next) => {
    try {
        const file = req.file
        console.log(file)
        if (file.mimetype !== "application/pdf") {
            return res.status(404).send({code: 404, error: {}, message: "File not pdf"})
        }
        fs.rename(file1 + `/public/pdf/${file.filename}`, file1 + `/public/pdf/${file.filename}.pdf`, (e) => {
            Promise.all([model.User.create({...req.body, isChecked: false, doc: file.path + ".pdf"})]).then(r => {
                return res.status(200).send({code: 200, user: r[0]})
            }).catch(e => {
                console.log(e)
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
        model.User.findOne({where: {email: email, password: password}}).then(r => {
            const token = jwt.sign({
                User: r.dataValues.id,
                email: r.dataValues.email,
                role: r.dataValues.role,
                date: new Date(),
            }, privateKey, {});
            res.status(200).send(Success(200, {token: token, date: new Date()}, "Ok"))
        }).catch(e => {
            res.status(404).send(ErrorSend(404, e, e.message))
        })
    } catch (e) {
        res.status(400).send(ErrorSend(400, e, e.message))
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
    registrationUser,
    loginUser,
    getMe
}