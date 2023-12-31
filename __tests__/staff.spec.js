const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../app');

require('dotenv').config();

/* Connecting to the database before each test. */
describe('Test Handlers', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  test('should return all staff', async () => {
    const res = await request(server).get('/staff');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return one staff', async () => {
    const res = await request(server).get('/staff/65650d901f46cf50da636f1c');
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('John');
  });
});
