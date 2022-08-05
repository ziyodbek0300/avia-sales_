const express = require('express');
const {getAllUser, getMe, acceptAgent, deleteUser, update} = require("../controller/user");
const router = express.Router();

router.get('/getAll', getAllUser);
router.get('/getMe', getMe);
router.post('/acceptAgent/:id', acceptAgent);
router.put('/update/:id', update);
router.put('/deleteUser/:id', deleteUser);

module.exports = router;
