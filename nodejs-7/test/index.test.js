const request = require('supertest')
const server = require('../src/server')

describe('Adoptable Pets API Endpoints...', () => {
  test('GET /v1/animals', async () => {
    const res = await request(server.app)
      .get('/v1/animals')

    expect(res.statusCode).toEqual(200)
  })

  test('GET /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .get('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })

  test('POST /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .post('/v1/animals')

    expect(res.statusCode).toEqual(200)
  })

  test('PATCH /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .patch('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })

  test('DELETE /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .patch('/v1/animals/1')

    expect(res.statusCode).toEqual(200)
  })
})
