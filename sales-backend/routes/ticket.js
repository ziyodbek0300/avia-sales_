const express = require('express');
const {getAll} = require("../controller/ticket");
const router = express.Router();

router.get('/getAll', getAll);
router.get('/getMe', getAll);
router.post('/acceptAgent/:id', getAll);
router.put('/update/:id', getAll);
router.put('/deleteUser/:id', getAll);

module.exports = router;
