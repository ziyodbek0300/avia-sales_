const express = require('express');
const {registrationUser, loginUser, attach} = require("../controller/registration");
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: './public/pdf/'})

router.post('/', upload.single('doc'), registrationUser);
router.post('/login', loginUser);
router.post('/attach',upload.array('file'), attach);

module.exports = router;
