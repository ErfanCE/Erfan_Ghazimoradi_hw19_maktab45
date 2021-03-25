const express = require('express');
const router = express.Router();
const userControll = require('../controllers/user-controller');


// main
router.get('/', userControll);

// users
router.get('/users', userControll);


module.exports = router;