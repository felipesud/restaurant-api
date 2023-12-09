const app = require('../app');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('Test Handlers', () => {
  let db;

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

  test('responds to /menus', async () => {
    const res = await request.get('/menus');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /menus/:id', async () => {
    const mockId = '656a0ccdfa8841ca09ac0cc2';
    const res = await request.get('/menus/' + mockId);
    expect(res.header['content-type']).toBe('application/json');
    expect(res.statusCode).toBe(200);
  });
});
