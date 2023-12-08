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
    db = await connection.db('menu');
  });
  afterAll(async () => {
    await connection.close();
  });

  test('responds to /menu', async () => {
    const res = await request.get('/menu');
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /menu/:id', async () => {
    const mockId = '656a0ccdfa8841ca09ac0cc2';
    const res = await request.get('/menu/' + mockId);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});