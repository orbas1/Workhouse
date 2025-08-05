const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const { uploadCv, createCv, createCoverLetter, fetchResume } = require('../controllers/resume');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/cv/upload', auth, upload.single('cv'), uploadCv);
router.post('/cv/generate', auth, createCv);
router.post('/cover-letter/generate', auth, createCoverLetter);
router.get('/', auth, fetchResume);

module.exports = router;
