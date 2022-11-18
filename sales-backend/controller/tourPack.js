const { Success, ErrorSend } = require("../service/SuccessAndError");
const userRole = require("../constants/userRole");
const { PrismaClient } = require("@prisma/client");
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
    Promise.all([
      prisma.tourPacketOrder.deleteMany({ where: { id: +req.params.id } }),
    ])
      .then((r) => {
        if (r[0]?.count > 0) {
          return res.status(200).send(Success(200, true, "ok"));
        } else {
          return res.status(404).send(ErrorSend(404, {}, "not found"));
        }
      })
      .catch((e) => {
        return res.status(404).send(ErrorSend(404, e, e.message));
      });
  } catch (e) {}
};

const getOne = async (req, res, next) => {
  try {
    prisma.tourPacketOrder
      .findUnique({
        where: { id: +req.params.id },
        include:{ flight: true, TourPackPassenger: true }
        // include: { flight: true, TourPackPassenger: true },
      })
      .then((r) => {
        if (r) {
          return res.status(200).send(Success(200, r, "ok"));
        }
        return res.status(404).send(ErrorSend(404, {}, "not found"));
      })
      .catch((e) => {
        return res.status(404).send(ErrorSend(404, e, e.message));
      });
  } catch (e) {
    return res.status(500).send({ code: 500, error: e, message: e.message });
  }
};

const getAll = async (req, res, next) => {
  try {
    prisma.tourPacketOrder
      .findMany({ include: { flight: true, TourPackPassenger: true } })
      .then((r) => {
        return res.status(200).send(Success(200, r, "ok"));
      })
      .catch((e) => {
        return res
          .status(404)
          .send({ code: 404, error: e, message: e.message });
      });
  } catch (e) {
    return res.status(505).send({ code: 505, error: e, message: e.message });
  }
};

const getAllForAgent = async (req, res, next) => {
  try {
    prisma.tourPacketOrder
      .findMany({
        where: { partnerId: +req.params.id },
        include: { flight: true, TourPackPassenger: true },
      })
      .then((r) => {
        return res.status(200).send(Success(200, r, "ok"));
      })
      .catch((e) => {
        return res
          .status(404)
          .send({ code: 404, error: e, message: e.message });
      });
  } catch (e) {
    return res.status(505).send({ code: 505, error: e, message: e.message });
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
    prisma.tourPacketOrder
      .update({ where: { id: +req.params.id }, data: req.body })
      .then((r) => {
        res.status(200).send(Success(200, r, "ok"));
      })
      .catch((e) => {
        res.status(404).send(ErrorSend(404, e, e.message));
      });
  } catch (e) {
    res.status(500).send(ErrorSend(500, e, e.message));
  }
};

const addNew = async (req, res, next) => {
  try {
    // if (!req.user || req.user.role === userRole.client || req.user.role === userRole.agent) {
    //     if (req.user && req.user.role === userRole.agent) {
    //         return res.status(404).send(ErrorSend(404, {}, "no user"))
    //     } else {
    //         return res.status(404).send(ErrorSend(404, {}, "no user"))
    //     }
    // }
    const orderBody = req.body;
    const passagers = orderBody?.passagers;
    delete orderBody?.passagers;

    let order = await prisma.tourPacketOrder
      .create({ data: orderBody })
      .catch((e) => {
        console.log(e);
      });
    const passenger = await prisma.$transaction(
      passagers?.map((r) => {
        return prisma.tourPackPassenger.create({
          data: {
            ...r,
            tourPackId: order.id,
          },
        });
      })
    );
    order = await prisma.tourPacketOrder
      .update({
        data: {
          passagersId: passenger.map((r) => {
            return r.id;
          }),
        },
        where: { id: order.id },
      })
      .catch((e) => {
        console.log("asdasdad", e);
      });
    res.status(200).send(Success(200, { order, passenger }, "ok"));
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
  getAllForAgent,
};
