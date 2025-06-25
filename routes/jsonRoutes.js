const express = require('express');
const router = express.Router();
const { validateJsonFormat } = require('../middleware/validation');
const JsonHistory = require('../models/JsonHistory');

// POST /api/format-json
router.post('/format-json', validateJsonFormat, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { json } = req.body;
    
    // Validate JSON syntax
    let parsedJson;
    try {
      parsedJson = JSON.parse(json);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid JSON',
        message: 'The provided input is not valid JSON',
        details: error.message
      });
    }
    
    // Format JSON with proper indentation
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    
    // Calculate processing time
    const processingTime = Date.now() - startTime;
    
    // Save to history
    const historyEntry = new JsonHistory({
      originalJson: json,
      formattedJson: formattedJson,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || '',
      processingTime
    });
    
    await historyEntry.save();
    
    res.json({
      success: true,
      formatted: formattedJson,
      processingTime,
      message: 'JSON formatted successfully'
    });
    
  } catch (error) {
    console.error('JSON formatting error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to format JSON'
    });
  }
});

// GET /api/validate-json 
router.post('/validate-json', validateJsonFormat, (req, res) => {
  try {
    const { json } = req.body;
    
    // Try to parse JSON
    JSON.parse(json);
    
    res.json({
      success: true,
      valid: true,
      message: 'JSON is valid'
    });
    
  } catch (error) {
    res.json({
      success: false,
      valid: false,
      message: 'JSON is invalid',
      details: error.message
    });
  }
});

module.exports = router; 