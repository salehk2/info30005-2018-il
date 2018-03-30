const express = require('express');
const router = express.Router();

const controller = require("../controllers/comingsoonController")


router.get('/', controller.sayHello)

module.exports = router;
