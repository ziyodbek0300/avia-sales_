const express = require('express');
const {getAllAgents} = require("../controller/agent");
const router = express.Router();

router.get('/getAll', getAllAgents);

module.exports = router;
