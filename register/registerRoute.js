const express = require('express');
const router = express.Router();
const register = require("./registration");

router.route('/')
.post(register);

module.exports = router;