const request = require('supertest')
const server = require('../src/server')
const {
  cleanDB,
  openDB,
  populateDB
} = require('./utils')

const mockDate = new Date("2020-02-03T12:26:59.659Z")

global.Date = class extends Date{
  constructor(){
    return mockDate
  }
}

beforeAll(() => cleanDB())
afterAll(() => cleanDB())

describe('The API on /api/animals Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      "ANI1580214599567RD121": {
        "created_at": "2020-01-28T12:29:59.567Z",
        "updated_at": "2020-01-28T12:29:59.567Z",
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho mais fofinho desse mundo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Macho",
        "color": "Branco Malhado",
        "image_url": ""
      },
      "ANI1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
    })
  })

  afterAll(() => cleanDB())

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/api/animals')

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        "ANI1580214599567RD121": {
          "created_at": "2020-01-28T12:29:59.567Z",
          "updated_at": "2020-01-28T12:29:59.567Z",
          "pet_name": "Belchior Fernandes Montalvão",
          "description": "Gatinho mais fofinho desse mundo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Macho",
          "color": "Branco Malhado",
          "image_url": ""
        },
        "ANI1580216220549RD493": {
          "created_at": "2020-01-28T12:57:00.550Z",
          "updated_at": "2020-01-28T12:57:00.550Z",
          "pet_name": "Tereza Fernandes Montalvão",
          "description": "Gatinha mais perfeita desse mundão redondo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Fêmea",
          "color": "Malhada",
          "image_url": ""
        }
      }
    })
  })
 })

describe('The API on /api/animals/:id Endpoint at GET method should...', () => {

  test('return 200 as status code and the animal registered by ID', async () => {
    
    const res = await request(server.app).get('/api/animals/ANI1580214599567RD121')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    })
  })

  test('return 404 as status code and the message with an error', async () => {

    const res = await request(server.app).get('/api/animals/ANI1580214599567RD1')

    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({error: 'The record ANI1580214599567RD1 couldn\'t be found.'})
  })

})

describe('The API on /api/animals Endpoint at POST method should...', () => {

  test('return 201 as status code and the registered animal', async () => {
    
    const newAnimal = {
      "pet_name": "Bolt",
      "description": "The super dog",
      "animal_type": "Dog",
      "pet_age": "10 years",
      "sex": "Male",
      "color": "White and beige",
      "image_url": "",
    }

    const res = await request(server.app).post('/api/animals').send(newAnimal)

    const expected = {
      ...newAnimal,
      "created_at": "2020-02-03T12:26:59.659Z",
      "updated_at": "2020-02-03T12:26:59.659Z",
    }

    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual(expected)
  })
})

describe('The API on /api/animals/:id Endpoint at PATCH method should...', () => {
  test('return 200 as status code and updated a animal by Id', async () => {

    const res = await request(server.app).patch('/api/animals/ANI1580214599567RD121')
    .send({"pet_age": "7 Meses"})
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
        "created_at": "2020-01-28T12:29:59.567Z",
        "updated_at": "2020-01-28T12:29:59.567Z",
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho mais fofinho desse mundo",
        "animal_type": "Gato",
        "pet_age": "7 Meses",
        "sex": "Macho",
        "color": "Branco Malhado",
        "image_url": ""
      })
  })

  test('return 404 as status code and the with an error', async () => {

    const res = await request(server.app).patch('/api/animals/ANI1580214599567RD1')

    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({"error": "The record ANI1580214599567RD1 couldn't be found."})
  })
})

describe('The API on /api/animals/:id Endpoint at DELETE method should...', () => {
  
  test('return 204 as status code', async () => {
    const res = await request(server.app).delete("/api/animals/ANI1580214599567RD121")

    expect(res.statusCode).toEqual(204)
  })

  test('return 404 as status code and the message with an error', async () => {

    const res = await request(server.app).delete("/api/animals/ANI1580214599567RD127")

    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({"error": "The record ANI1580214599567RD127 couldn't be found."})
  })
})

describe('The test should..', () => {
  
  test('return a object', async () => {
    
    const db = openDB()
    
    expect(db).toMatchObject({})

  })
})
