const express = require('express');
const {getAllUser, getMe} = require("../controller/user");
const router = express.Router();

router.get('/getAll', getAllUser);
router.get('/getMe', getMe);

module.exports = router;
