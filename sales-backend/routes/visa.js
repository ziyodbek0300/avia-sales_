const express = require('express');
const {getAll, getOne, del, update, addNew,getAllForAgent} = require("../controller/visa");
const router = express.Router();

router.get('/getAll', getAll);
router.get('/all/:id', getAllForAgent);
router.post('/addNew', addNew);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', del);

module.exports = router;
