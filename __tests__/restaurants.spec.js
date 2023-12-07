const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('Test Handlers', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('restaurants');
  });
  afterAll(async () => {
    await connection.close();
  });

  test('responds to /restaurants', async () => {
    const res = await request.get('/restaurants');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /restaurants/:id', async () => {
    const mockId = '656509df1f46cf50da636ef2';
    const res = await request.get('/restaurants/' + mockId);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
