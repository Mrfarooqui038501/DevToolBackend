const Joi = require('joi');

// JSON formatting validation schema
const jsonFormatSchema = Joi.object({
  json: Joi.string().required().messages({
    'string.empty': 'JSON input cannot be empty',
    'any.required': 'JSON input is required'
  })
});

// Base64 encoding validation schema
const base64EncodeSchema = Joi.object({
  text: Joi.string().required().messages({
    'string.empty': 'Text input cannot be empty',
    'any.required': 'Text input is required'
  })
});

// Base64 decoding validation schema
const base64DecodeSchema = Joi.object({
  encoded: Joi.string().required().messages({
    'string.empty': 'Base64 input cannot be empty',
    'any.required': 'Base64 input is required'
  })
});

// Validation middleware factory
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    
    // Replace req.body with validated data
    req.body = value;
    next();
  };
};

// Export validation middleware
module.exports = {
  validateJsonFormat: validateRequest(jsonFormatSchema),
  validateBase64Encode: validateRequest(base64EncodeSchema),
  validateBase64Decode: validateRequest(base64DecodeSchema)
}; 