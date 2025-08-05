const { storeCv, generateCv, storeCoverLetter, generateCoverLetter, getResume } = require('../services/resume');

async function uploadCv(req, res) {
  try {
    const record = await storeCv(req.user.username, req.file);
    res.status(201).json(record);
  } catch (err) {
    console.error('CV upload failed', err);
    res.status(500).json({ error: 'Failed to upload CV' });
  }
}

async function createCv(req, res) {
  const { prompt } = req.body;
  try {
    const content = await generateCv(req.user.username, prompt);
    res.json({ content });
  } catch (err) {
    console.error('CV generation failed', err);
    res.status(500).json({ error: 'Failed to generate CV' });
  }
}

async function createCoverLetter(req, res) {
  const { prompt } = req.body;
  try {
    const content = await generateCoverLetter(req.user.username, prompt);
    res.json({ content });
  } catch (err) {
    console.error('Cover letter generation failed', err);
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
}

async function uploadCoverLetter(req, res) {
  try {
    const record = await storeCoverLetter(req.user.username, req.file);
    res.status(201).json(record);
  } catch (err) {
    console.error('Cover letter upload failed', err);
    res.status(500).json({ error: 'Failed to upload cover letter' });
  }
}

async function fetchResume(req, res) {
  try {
    const data = await getResume(req.user.username);
    res.json(data);
  } catch (err) {
    console.error('Failed to fetch resume', err);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
}

module.exports = { uploadCv, createCv, createCoverLetter, uploadCoverLetter, fetchResume };
