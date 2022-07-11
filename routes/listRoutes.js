const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.route('/').get(listController.getAllLists);

module.exports = router;
