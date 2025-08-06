const express = require('express');
const { getLibraryHandler, getDetailsHandler } = require('../controllers/contentLibrary');
const router = express.Router();

router.get('/', getLibraryHandler);
router.get('/:type/:id', getDetailsHandler);

module.exports = router;
