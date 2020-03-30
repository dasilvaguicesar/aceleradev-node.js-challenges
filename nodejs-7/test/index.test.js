jest.mock("../src/model", () => {
  let data = [
    {
      "id": 1,
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho fofinho demais",
      "animal_type": "Gato",
      "pet_age": 1,
      "pet_size": "Pequeno",
      "sex": "Macho",
      "color": "Branco com rajadas violentas demais",
      "image_url": "não tem",
      "createdAt": "2020-01-06T01:19:54.000Z",
      "updatedAt": "2020-01-06T01:25:48.000Z"
    },
    {
      "id": 2,
      "pet_name": "Tereza Fernandes Montalvão",
      "description": "Gatinha fofinha demais",
      "animal_type": "Gato",
      "pet_age": 2,
      "pet_size": "Pequeno",
      "sex": "Fêmea",
      "color": "Rajadinha",
      "image_url": "não tem",
      "createdAt": "2020-01-06T01:28:53.000Z",
      "updatedAt": "2020-01-06T01:29:03.000Z"
    }
  ]

  const animals = {
    findAll: () => Promise.resolve(data),
    findOne: (param) => {
      const id = parseInt(param.where.id)
      return Promise.resolve(data.find(item => item.id === id))
    },
    create: (param) => Promise.resolve(data[0]),
    update: (data, opt) => Promise.resolve({}),
    destroy: (param) => {
      const id = parseInt(param.where.id)
      return Promise.resolve(data.filter(item => item.id !== id))
    }
  }

  return { animals }
});

const request = require('supertest')
const server = require('../src/server')

describe('Adoptable Pets API Endpoints...', () => {
  test('GET /v1/animals', async () => {
    const res = await request(server.app)
      .get('/v1/animals')

    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toEqual(2)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
    expect(res.body.data instanceof Array).toBe(true)
    expect(res.body.data[0]).toMatchObject({
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho fofinho demais",
      "animal_type": "Gato",
      "pet_age": 1,
      "pet_size": "Pequeno",
      "sex": "Macho",
      "color": "Branco com rajadas violentas demais",
      "image_url": "não tem",
    })
    expect(Object.keys(res.body.data[1])).toMatchObject([
      'id',
      'pet_name',
      'description',
      'animal_type',
      'pet_age',
      'pet_size',
      'sex',
      'color',
      'image_url',
      'createdAt',
      'updatedAt'
    ])
  })

  test('GET /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .get('/v1/animals/1')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho fofinho demais",
        "animal_type": "Gato",
        "pet_age": 1,
        "pet_size": "Pequeno",
        "sex": "Macho",
        "color": "Branco com rajadas violentas demais",
        "image_url": "não tem",
      })
      expect(Object.keys(res.body)).toMatchObject([
        'id',
        'pet_name',
        'description',
        'animal_type',
        'pet_age',
        'pet_size',
        'sex',
        'color',
        'image_url',
        'createdAt',
        'updatedAt'
      ])
  })

  test('POST /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .post('/v1/animals')
      .send({
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho fofinho demais",
        "animal_type": "Gato",
        "pet_age": 1,
        "pet_size": "Pequeno",
        "sex": "Macho",
        "color": "Branco com rajadas violentas demais",
        "image_url": "não tem"
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      "id": 1,
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho fofinho demais",
      "animal_type": "Gato",
      "pet_age": 1,
      "pet_size": "Pequeno",
      "sex": "Macho",
      "color": "Branco com rajadas violentas demais",
      "image_url": "não tem",
      "createdAt": "2020-01-06T01:19:54.000Z",
      "updatedAt": "2020-01-06T01:25:48.000Z"
    })
    expect(Object.keys(res.body)).toMatchObject([
      'id',
      'pet_name',
      'description',
      'animal_type',
      'pet_age',
      'pet_size',
      'sex',
      'color',
      'image_url',
      'createdAt',
      'updatedAt'
    ])
  })

  test('PATCH /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .patch('/v1/animals/1')
      .send({
        "color": "Gato preto com patinhas brancas."
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({})
  })

  test('DELETE /v1/animals/:animalId', async () => {
    const res = await request(server.app)
      .delete('/v1/animals/1')

    expect(res.statusCode).toEqual(204)
  })
})
