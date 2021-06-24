require('dotenv').config();

// const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
// const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    test('returns location', async() => {

      const expectation = {
        formatted_search: 'Albuquerque, Bernalillo County, New Mexico, USA',
        latitude: '35.0841034',
        longitude: '-106.6509851'
      };
      const data = await fakeRequest(app)
        .get('/location?search=Albuquerque')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    test('returns weather', async() => {

      const expectation = [
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) }
      ];
      const data = await fakeRequest(app)
        .get('/weather?latitude=35.0841034&longitude=-106.6509851')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
