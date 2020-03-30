const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

beforeAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS players;')
  await db.sequelize.query('DROP TABLE IF EXISTS teams;')
  await db.sequelize.sync()
})

afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS players;')
  await db.sequelize.query('DROP TABLE IF EXISTS teams;')
  await db.sequelize.close()
})

describe('The API on /v1/teams Endpoint at GET method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Barcelona",
      "description": "Maior time da Espanha, um dos maiores do mundo.",
      "coach": "Pep Guardiola",
      "shieldUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX6B-dSVeh_FkSEAVCQtTYggmm_FCYZi1xhegdkPd5Ch9Jb-ke",
      "birthYear": 1899
    })

    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    const res = await request(server.app).get('/v1/teams')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/v1/teams')

    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/v1/teams')

    expect(res.body.data[0]).toMatchObject({
      "name": "Barcelona",
      "description": "Maior time da Espanha, um dos maiores do mundo.",
      "coach": "Pep Guardiola",
      "shieldUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX6B-dSVeh_FkSEAVCQtTYggmm_FCYZi1xhegdkPd5Ch9Jb-ke",
      "birthYear": 1899
    })
  })
})

describe('The API on /v1/teams/:teamId Endpoint at GET method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Barcelona",
      "description": "Maior time da Espanha, um dos maiores do mundo.",
      "coach": "Pep Guardiola",
      "shieldUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQX6B-dSVeh_FkSEAVCQtTYggmm_FCYZi1xhegdkPd5Ch9Jb-ke",
      "birthYear": 1899
    })

    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have properly attributes`, async () => {
    const res = await request(server.app).get('/v1/teams/1')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'id',
      'name',
      'description',
      'coach',
      'shieldUrl',
      'birthYear',
      'createdAt',
      'updatedAt',
      'players'
    ])
  })

  test(`return 200 as status code and the item founded`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/v1/teams/2')

    expect(res.body).toMatchObject({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })
})

describe('The API on /v1/teams/:teamId/players Endpoint at GET method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })

    await db.players.create({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    await db.players.create({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    const res = await request(server.app).get('/v1/teams/1/players')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    const res = await request(server.app).get('/v1/teams/1/players')

    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    const res = await request(server.app).get('/v1/teams/1/players')

    expect(res.body.data[0]).toMatchObject({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    expect(res.body.data[1]).toMatchObject({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })
})

describe('The API on /v1/teams Endpoint at POST method should...', () => {
  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 201 as status code and the new record created properties`, async () => {
    const res = await request(server.app)
      .post('/v1/teams')
      .send({
        "name": "Atlético MG",
        "description": "Maior time do Brasil",
        "coach": "Cuca",
        "shieldUrl": "",
        "birthYear": 1908
      })

    expect(res.statusCode).toEqual(201)
    expect(Object.keys(res.body)).toMatchObject([
      'id',
      'name',
      'description',
      'coach',
      'shieldUrl',
      'birthYear',
      'updatedAt',
      'createdAt'
    ])
  })

  test(`return the new record created`, async () => {
    const res = await request(server.app)
      .post('/v1/teams')
      .send({
        "name": "Atlético MG",
        "description": "Maior time do Brasil",
        "coach": "Cuca",
        "shieldUrl": "",
        "birthYear": 1908
      })


    expect(res.body).toMatchObject({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })
  })
})

describe('The API on /v1/players Endpoint at GET method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })

    await db.players.create({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    await db.players.create({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })

    await db.players.create({
      "name": "Juan Cazares",
      "nickname": "cazares",
      "nationality": "Boliviano",
      "age": 25,
      "wage": 750000,
      "score": 79,
      "teamId": 1
    })
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    const res = await request(server.app).get('/v1/players')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    const res = await request(server.app).get('/v1/players')

    expect(res.body.total).toEqual(3)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    const res = await request(server.app).get('/v1/players')

    expect(res.body.data[0]).toMatchObject({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    expect(res.body.data[1]).toMatchObject({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })

  test(`return only brazilian players if uses query parameter 'nationality' on request`, async () => {
    const res = await request(server.app).get('/v1/players?nationality=Brasileiro')

    expect(res.body.total).toBe(2)

    expect(res.body.data[0]).toMatchObject({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    expect(res.body.data[1]).toMatchObject({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })

  test(`return only players with score equal or greather than 90 if uses query parameter 'score' on request`, async () => {
    const res = await request(server.app).get('/v1/players?score=90')

    expect(res.body.total).toBe(1)

    expect(res.body.data[0]).toMatchObject({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })
  })
})

describe('The API on /v1/players/:playerId Endpoint at GET method should...', () => {
  beforeEach(async () => {
    await db.teams.create({
      "name": "Atlético MG",
      "description": "Maior time do Brasil",
      "coach": "Cuca",
      "shieldUrl": "",
      "birthYear": 1908
    })

    await db.players.create({
      "name": "Ronaldinho Gaúcho",
      "nickname": "ronaldinho",
      "nationality": "Brasileiro",
      "age": 36,
      "wage": 3500000,
      "score": 92,
      "teamId": 1
    })

    await db.players.create({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have properly attributes`, async () => {
    const res = await request(server.app).get('/v1/players/1')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'id',
      'name',
      'nickname',
      'nationality',
      'age',
      'wage',
      'score',
      'createdAt',
      'updatedAt',
      'teamId',
    ])
  })

  test(`return 200 as status code and the item founded`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/v1/players/2')

    expect(res.body).toMatchObject({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })
})

describe('The API on /v1/players Endpoint at POST method should...', () => {
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
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE players;')
    await db.sequelize.query('TRUNCATE TABLE teams;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 201 as status code and the new record created properties`, async () => {
    const res = await request(server.app)
      .post('/v1/players')
      .send({
        "name": "Diego Tardelli",
        "nickname": "tardelli",
        "nationality": "Brasileiro",
        "age": 34,
        "wage": 1990000,
        "score": 85,
        "teamId": 1
      })

    expect(res.statusCode).toEqual(201)
    expect(Object.keys(res.body)).toMatchObject([
      'id',
      'name',
      'nickname',
      'nationality',
      'age',
      'wage',
      'score',
      'teamId',
      'updatedAt',
      'createdAt'
    ])
  })

  test(`return the new record created`, async () => {
    const res = await request(server.app)
      .post('/v1/players')
      .send({
        "name": "Diego Tardelli",
        "nickname": "tardelli",
        "nationality": "Brasileiro",
        "age": 34,
        "wage": 1990000,
        "score": 85,
        "teamId": 1
      })

    expect(res.body).toMatchObject({
      "name": "Diego Tardelli",
      "nickname": "tardelli",
      "nationality": "Brasileiro",
      "age": 34,
      "wage": 1990000,
      "score": 85,
      "teamId": 1
    })
  })
})