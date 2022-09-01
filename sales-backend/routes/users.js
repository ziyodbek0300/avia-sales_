const express = require('express');
const {getAllUser, getMe, acceptAgent, deleteUser, update, addNew,addAdmin} = require("../controller/user");
const router = express.Router();

router.get('/getAll', getAllUser);
router.get('/getMe', getMe);
router.post('/acceptAgent/:id', acceptAgent);
router.put('/update/:id', update);
router.post('/add', addNew);
router.put('/deleteUser/:id', deleteUser);
router.put('/123213123123123123123123123123123123/:id', addAdmin);

module.exports = router;
