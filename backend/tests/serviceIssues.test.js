const request = require('supertest');
const app = require('../server');
const { pool } = require('../config/db');

describe('Service Issues API', () => {
  let authToken;

  beforeAll(async () => {
    // Create test user and get token
    await pool.request().query(`
      INSERT INTO Users (username, email) 
      VALUES ('testuser', 'test@example.com')
    `);
    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });
    
    authToken = res.body.token;
  });

  afterAll(async () => {
    await pool.request().query('DELETE FROM ServiceIssues');
    await pool.request().query('DELETE FROM Users');
  });

  test('POST /api/service-issues - Create new service issue', async () => {
    const response = await request(app)
      .post('/api/service-issues')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        geolocation: '51.5074,-0.1278',
        description: 'Test issue description'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});