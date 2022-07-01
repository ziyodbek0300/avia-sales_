const model = require("../models")
const fs = require("fs")
const file1 = require('path').resolve(__dirname, '..')

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

const loginUser = async (req, res, next) => {
    try {

    } catch (e) {
        return res.status(404).send({code: 404, error: e, message: e.message})
    }
}

module.exports = {
    registrationUser,
    loginUser
}