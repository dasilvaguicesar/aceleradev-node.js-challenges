const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

beforeAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS teams;')
  await db.sequelize.sync()
})

afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS teams;')
  await db.sequelize.close()
})

describe('The API on /v1/auth/login Endpoint at POST method should...', () => {
  test(`return 200 as status code and the new token generated`, async () => {
    const res = await request(server.app)
      .post('/v1/auth/login')
      .send({
        user: 'admin',
        password: 'Admin@123!'
      })

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject(['token'])
  })

  test(`return 401 as status code for a given user or password invalid`, async () => {
    const res = await request(server.app)
      .post('/v1/auth/login')
      .send({
        user: 'admin',
        password: 'potatoes'
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({
      "error": "Invalid user or password."
    })
  })
})

describe('The API on /v1/teams Endpoint at POST method should...', () => {
  afterEach(async () => {
    await db.sequelize.query('TRUNCATE TABLE teams;')
  })

  test(`return 201 as status code and the new record created`, async () => {
    const { token = '' } = (
      await request(server.app)
        .post('/v1/auth/login')
        .send({
          user: 'admin',
          password: 'Admin@123!'
        })
    ).body

    const res = await request(server.app)
      .post('/v1/teams')
      .set('x-auth-token', token)
      .send({
        "name": "Atlético MG",
        "description": "Maior time do Brasil",
        "coach": "Cuca",
        "shieldUrl": "",
        "birthYear": 1908
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  test(`return 401 as status code if a invalid token is passed on header`, async () => {
    const token = 'some invalid token'

    const res = await request(server.app)
      .post('/v1/teams')
      .set('x-auth-token', token)
      .send({
        "name": "Atlético MG",
        "description": "Maior time do Brasil",
        "coach": "Cuca",
        "shieldUrl": "",
        "birthYear": 1908
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({
      "error": "Invalid token."
    })
  })
})

describe('The API on /v1/teams Endpoint at PATCH method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  afterEach(async () => {
    await db.sequelize.query('TRUNCATE TABLE teams;')
  })

  test(`return 200 as status code and the record updated`, async () => {
    const { token = '' } = (
      await request(server.app)
        .post('/v1/auth/login')
        .send({
          user: 'admin',
          password: 'Admin@123!'
        })
    ).body

    const res = await request(server.app)
      .patch('/v1/teams/1')
      .set('x-auth-token', token)
      .send({
        "description": "O melhor time do Brasil"
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      "name": "Atlético MG",
      "description": "O melhor time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  test(`return 401 as status code if a invalid token is passed on header`, async () => {
    const token = 'some invalid token'

    const res = await request(server.app)
      .patch('/v1/teams/1')
      .set('x-auth-token', token)
      .send({
        "description": "O melhor time do Brasil"
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({
      "error": "Invalid token."
    })
  })
})

describe('The API on /v1/teams Endpoint at DELETE method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  afterEach(async () => {
    await db.sequelize.query('TRUNCATE TABLE teams;')
  })

  test(`return 204 as status code for a deleted team`, async () => {
    const { token = '' } = (
      await request(server.app)
        .post('/v1/auth/login')
        .send({
          user: 'admin',
          password: 'Admin@123!'
        })
    ).body

    const res = await request(server.app)
      .delete('/v1/teams/1')
      .set('x-auth-token', token)
      .send({
        "description": "O melhor time do Brasil"
      })

    expect(res.statusCode).toEqual(204)
  })

  test(`return 401 as status code if a invalid token is passed on header`, async () => {
    const token = 'some invalid token'

    const res = await request(server.app)
      .delete('/v1/teams/1')
      .set('x-auth-token', token)
      .send({
        "description": "O melhor time do Brasil"
      })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({
      "error": "Invalid token."
    })
  })
})
