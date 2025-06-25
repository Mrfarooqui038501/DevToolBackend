const express = require('express');
const router = express.Router();
const JsonHistory = require('../models/JsonHistory');

// GET /api/history
router.get('/history', async (req, res) => {
  try {
    const { limit = 50, page = 1, ip } = req.query;
    
    let query = {};
    
    // Filter by IP if provided
    if (ip) {
      query.ipAddress = ip;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get history with pagination
    const history = await JsonHistory.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    // Get total count for pagination
    const total = await JsonHistory.countDocuments(query);
    
    res.json({
      success: true,
      history: history,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      message: 'History retrieved successfully'
    });
    
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve history'
    });
  }
});

// GET /api/history/stats
router.get('/history/stats', async (req, res) => {
  try {
    // Get basic statistics
    const totalRecords = await JsonHistory.countDocuments();
    const todayRecords = await JsonHistory.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    
    // Get unique IPs
    const uniqueIPs = await JsonHistory.distinct('ipAddress');
    
    // Get average processing time
    const avgProcessingTime = await JsonHistory.aggregate([
      {
        $group: {
          _id: null,
          avgTime: { $avg: '$processingTime' }
        }
      }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalRecords,
        todayRecords,
        uniqueIPs: uniqueIPs.length,
        avgProcessingTime: avgProcessingTime[0]?.avgTime || 0
      },
      message: 'Statistics retrieved successfully'
    });
    
  } catch (error) {
    console.error('Statistics retrieval error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve statistics'
    });
  }
});

// DELETE /api/history/cleanup (admin endpoint)
router.delete('/history/cleanup', async (req, res) => {
  try {
    const result = await JsonHistory.cleanOldRecords();
    
    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: 'Old records cleaned up successfully'
    });
    
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to cleanup old records'
    });
  }
});

// GET /api/history/:id
router.get('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const record = await JsonHistory.findById(id).select('-__v');
    
    if (!record) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'History record not found'
      });
    }
    
    res.json({
      success: true,
      record,
      message: 'Record retrieved successfully'
    });
    
  } catch (error) {
    console.error('Record retrieval error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve record'
    });
  }
});

module.exports = router; 