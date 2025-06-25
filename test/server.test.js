const request = require('supertest');
const app = require('../server');

describe('Dev Toolbox API', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });

  describe('JSON Formatter', () => {
    it('should format valid JSON', async () => {
      const testJson = '{"name":"John","age":30}';
      const response = await request(app)
        .post('/api/format-json')
        .send({ json: testJson });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.formatted).toContain('"name"');
    });

    it('should return error for invalid JSON', async () => {
      const invalidJson = '{"name":"John",}';
      const response = await request(app)
        .post('/api/format-json')
        .send({ json: invalidJson });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid JSON');
    });
  });

  describe('Base64 Operations', () => {
    it('should encode text to Base64', async () => {
      const text = 'Hello World';
      const response = await request(app)
        .post('/api/encode')
        .send({ text });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.encoded).toBe('SGVsbG8gV29ybGQ=');
    });

    it('should decode Base64 to text', async () => {
      const encoded = 'SGVsbG8gV29ybGQ=';
      const response = await request(app)
        .post('/api/decode')
        .send({ encoded });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.decoded).toBe('Hello World');
    });
  });
}); 