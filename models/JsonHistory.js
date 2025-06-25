const mongoose = require('mongoose');

const jsonHistorySchema = new mongoose.Schema({
  originalJson: {
    type: String,
    required: [true, 'Original JSON is required'],
    trim: true
  },
  formattedJson: {
    type: String,
    required: [true, 'Formatted JSON is required'],
    trim: true
  },
  ipAddress: {
    type: String,
    required: [true, 'IP address is required']
  },
  userAgent: {
    type: String,
    default: ''
  },
  processingTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


jsonHistorySchema.index({ createdAt: -1 });
jsonHistorySchema.index({ ipAddress: 1 });

// Virtual for formatted date
jsonHistorySchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleString();
});

// Pre-save middleware to validate JSON
jsonHistorySchema.pre('save', function(next) {
  try {
    // Validate that both original and formatted are valid JSON
    JSON.parse(this.originalJson);
    JSON.parse(this.formattedJson);
    next();
  } catch (error) {
    next(new Error('Invalid JSON data'));
  }
});

// Static method to get recent history
jsonHistorySchema.statics.getRecentHistory = function(limit = 50) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');
};

// Static method to get history by IP
jsonHistorySchema.statics.getHistoryByIP = function(ipAddress, limit = 20) {
  return this.find({ ipAddress })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');
};

// Static method to clean old records (older than 30 days)
jsonHistorySchema.statics.cleanOldRecords = function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return this.deleteMany({
    createdAt: { $lt: thirtyDaysAgo }
  });
};

module.exports = mongoose.model('JsonHistory', jsonHistorySchema); 