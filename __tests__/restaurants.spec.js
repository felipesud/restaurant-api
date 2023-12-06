const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const app = express();
app.use('/', require('../routes/index'));

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /api-docs/restaurants', () => {
  it('should return all restaurants', async () => {
    const res = await request(app).get('/restaurants/');
    expect(res.statusCode).toBe(200);
  });
});
