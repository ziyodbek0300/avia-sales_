const express = require('express');
const {registrationUser, loginUser} = require("../controller/registration");
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: './public/pdf/'})

router.post('/', upload.single('doc'), registrationUser);
router.post('/login', loginUser);

module.exports = router;
