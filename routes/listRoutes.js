const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router;

router.route('/').get(listController.getAllList);

module.exports = router;
