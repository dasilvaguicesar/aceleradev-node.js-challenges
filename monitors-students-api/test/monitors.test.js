const request = require('supertest')
const server = require('../src/server')
const { sequelize } = require('../src/models/index')

afterAll(() => sequelize.close())

describe('the API on /v1/monitors Endpoint at GET method should...', () => {

})

test('return 200 as status code and have "total" and "data" as properties', async () => {

    const res = await request(server.app).get('/v1/monitors')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({   
        "data": [],
        "total": 0,
    })

})

test('return 200 as status code and the item founded', () => {
    const res = await request(server.app).get('/v1/monitors/1')

    expect()
})
