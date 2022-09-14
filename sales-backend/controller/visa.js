const {Success, ErrorSend} = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const del = async (req, res, next) => {
    try {
        if (
            !req.user ||
            req.user.role === userRole.client ||
            req.user.role === userRole.agent
        ) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"));
                // return next()
            } else {
                return res.status(401).send(ErrorSend(401, {}, "no user"));
            }
        }
        Promise.all([prisma.visa.deleteMany({where: {id: +req.params.id}})])
            .then((r) => {
                if (r[0]?.count > 0) {
                    return res.status(200).send(Success(200, true, "ok"));
                } else {
                    return res.status(404).send(ErrorSend(404, {}, "not found"));
                }
            })
            .catch((e) => {
                console.log(e);
                return res.status(404).send(ErrorSend(404, e, e.message));
            });
    } catch (e) {
        return res.status(500).send({code: 500, error: e, message: e.message});
    }
};

const getOne = async (req, res) => {
    try {
        prisma.visa
            .findUnique({where: {id: +req.params.id}, include: {VisaPassenger: true}})
            .then((r) => {
                return res.status(200).send(Success(200, r, "ok"));
            })
            .catch((e) => {
                console.log(e);
                return res.status(404).send(ErrorSend(404, e, e.message));
            });
    } catch (e) {
        return res.status(500).send({code: 500, error: e, message: e.message});
    }
};

const getAll = async (req, res, next) => {
    try {
        prisma.visa
            .findMany({ include: {VisaPassenger: true}})
            .then((r) => {
                return res.status(200).send(Success(200, r, "ok"));
            })
            .catch((e) => {
                return res
                    .status(404)
                    .send({code: 404, error: e, message: e.message});
            });
    } catch (e) {
        return res.status(505).send({code: 505, error: e, message: e.message});
    }
};

const update = async (req, res, next) => {
    try {
        if (
            !req.user ||
            req.user.role === userRole.client ||
            req.user.role === userRole.agent
        ) {
            if (req.user && req.user.role === userRole.agent) {
                return res.status(404).send(ErrorSend(404, {}, "no user"));
            } else {
                return res.status(404).send(ErrorSend(404, {}, "no user"));
            }
        }
        prisma.visa
            .update({where: {id: +req.params.id}, data: req.body})
            .then((r) => {
                res.status(200).send(Success(200, r, "ok"));
            })
            .catch((e) => {
                console.log(e);
                res.status(404).send(ErrorSend(404, e, e.message));
            });
    } catch (e) {
        res.status(500).send(ErrorSend(500, e, e.message));
    }
};

const addNew = async (req, res, next) => {
    try {
        const orderBody = req.body;
        const passagers = orderBody?.passengers;
        delete orderBody?.passengers;
        let transfer = await prisma.visa.create({data: orderBody}).catch((e) => {
            res.status(400).send(ErrorSend(400, e, e.message));
        });
        console.log("transfer",transfer.id)
        const passenger = await prisma
            .$transaction(
                passagers?.map((r) => {
                    return prisma.visaPassenger.create({
                        data: {
                            lastname: r.lastname,
                            firtname: r.firtname,
                            nationality: r.nationality,
                            gender: r.gender,
                            birthday: r.birthday,
                            passportNumber: r.passportNumber,
                            endDate: r.endDate,
                            visaId: transfer.id,
                        },
                    });
                })
            )
            .catch((e) => {
                console.log(e.message)
                res.status(400).send(ErrorSend(400, e, e.message));
            });

        transfer = await prisma.visa
            .update({
                data: {
                    passengers: passenger.map((r) => {
                        return r.id;
                    }),
                },
                where: {id: transfer.id},
            })
            .catch((e) => {
                res.status(400).send(ErrorSend(400, e, e.message));
            });
        res.status(200).send(Success(200, transfer, "ok"));
    } catch (e) {
        res.status(500).send(ErrorSend(500, e, e.message));
    }
};

module.exports = {
    getAll,
    getOne,
    del,
    update,
    addNew,
};
