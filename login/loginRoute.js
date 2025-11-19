const express = require('express');
const router = express.Router();
const login = require("./login");

router.route('/')
.post(login);

module.exports = router;