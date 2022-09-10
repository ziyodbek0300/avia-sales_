const express = require('express');
const {getAll, getOne, del, update, addNew,searchTour} = require("../controller/flight");
const router = express.Router();

router.get('/getAll', getAll);
router.post('/addNew', addNew);
router.get('/getOne/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', del);
router.get('/search', searchTour);

module.exports = router;
