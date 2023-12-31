const app = require('../app');
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
    db = await connection.db('restaurant_api');
  });
  afterAll(async () => {
    await connection.close();
  });

  test('responds to /orders', async () => {
    const res = await request.get('/orders');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /orders/:id', async () => {
    const mockId = '65650cd01f46cf50da636f14';
    const res = await request.get('/orders/' + mockId);
    expect(res.header['content-type']).toBe('application/json');
    expect(res.statusCode).toBe(200);
  });
});
