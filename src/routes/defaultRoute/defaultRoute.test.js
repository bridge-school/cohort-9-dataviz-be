const request = require('supertest');

const { defaultRouter } = require('./defaultRoute.router');

describe('tests for default route endpoint', () => {
  it('returns correct response to non existing route', () => {
    const response = {
      error: 'Incorrect Route'
    };
    expect(defaultRouter).toContain(response);
  });
});
