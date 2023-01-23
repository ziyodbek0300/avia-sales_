const express = require("express");
const {
    getAll,
    getOne,
    del,
    update,
    addNew,
    getAllForAgent,
    accept
} = require("../controller/hotelOrder");
const router = express.Router();

router.get("/getAll", getAll);
router.get("/all/:id", getAllForAgent);
router.get("/accept/:id", accept);
router.post("/addNew", addNew);
router.get("/getOne/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", del);

module.exports = router;
