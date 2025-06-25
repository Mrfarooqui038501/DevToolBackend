const express = require('express');
const router = express.Router();
const { validateBase64Encode, validateBase64Decode } = require('../middleware/validation');

// POST /api/encode
router.post('/encode', validateBase64Encode, (req, res) => {
  try {
    const { text } = req.body;
    
    // Encode text to Base64
    const encoded = Buffer.from(text, 'utf8').toString('base64');
    
    res.json({
      success: true,
      original: text,
      encoded: encoded,
      message: 'Text encoded successfully'
    });
    
  } catch (error) {
    console.error('Base64 encoding error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to encode text'
    });
  }
});

// POST /api/decode
router.post('/decode', validateBase64Decode, (req, res) => {
  try {
    const { encoded } = req.body;
    
    // Validate if the input is valid Base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
      return res.status(400).json({
        error: 'Invalid Base64',
        message: 'The provided input is not valid Base64 encoded string'
      });
    }
    
    // Decode Base64 to text
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    
    res.json({
      success: true,
      original: encoded,
      decoded: decoded,
      message: 'Base64 decoded successfully'
    });
    
  } catch (error) {
    console.error('Base64 decoding error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to decode Base64 string'
    });
  }
});


router.post('/encode-file', (req, res) => {
  try {
    
    res.status(501).json({
      error: 'Not Implemented',
      message: 'File encoding feature is not yet implemented'
    });
  } catch (error) {
    console.error('File encoding error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to encode file'
    });
  }
});

module.exports = router; 