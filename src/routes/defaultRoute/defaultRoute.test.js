const request = require('supertest');
const { app } = require('../../index');

//const { defaultRouter } = require('./defaultRoute.router');

describe('tests for default route endpoint', () => {
  it('responds with json containing error when route does not exist', async () => {
    const response = await request(app).get('/default');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: 'Incorrect Route'
    });
  });
});
