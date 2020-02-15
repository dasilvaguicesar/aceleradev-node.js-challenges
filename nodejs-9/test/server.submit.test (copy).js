const request = require('supertest')
const { app } = require('../src/server.js')
const { populateTable, cleanTable, connection } = require('./utils')

beforeAll(() => cleanTable('students_test'))

beforeEach(() => {
  populateTable('students_test', {
    'name': 'Eve',
    'surname': 'Montalvão',
    'email': 'evemontalvao@gmail.com',
    'age': 25,
    'gender': 'Feminino',
    'class': 'Node.js',
    'is_employed': true,
    'city': 'São Paulo'
  })
})

afterEach(() => cleanTable('students_test'))

afterAll(() => connection.end())

describe('GET /v1/students should', () => {
  test('return all students', async () => {
    const response = await request(app).get('/v1/students')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{
      id: 1,
      name: 'Eve',
      surname: 'Montalvão',
      email: 'evemontalvao@gmail.com',
      age: 25,
      gender: 'Feminino',
      class: 'Node.js',
      is_employed: 1,
      city: 'São Paulo'
    }])
  })
})

describe('GET /v1/students/:id should', () => {
  test('return student based on id', async () => {
    const response = await request(app).get('/v1/students/1')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{
      id: 1,
      name: 'Eve',
      surname: 'Montalvão',
      email: 'evemontalvao@gmail.com',
      age: 25,
      gender: 'Feminino',
      class: 'Node.js',
      is_employed: 1,
      city: 'São Paulo'
    }])
  })
})

describe('POST /v1/students should', () => {
  test('create a new occurence', async () => {
    const response = await request(app)
      .post('/v1/students')
      .send({
        name: 'Wil',
        surname: 'Fernandes',
        email: 'wilmar.wfjs@gmail.com',
        age: 25,
        gender: 'Masculino',
        class: 'Node.js',
        is_employed: 1,
        city: 'São Paulo'
      })
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      success: 'A new record has been created.'
    })

    const updatedData = await request(app).get('/v1/students/2')

    expect(updatedData.body[0]).toEqual({
      id: 2,
      name: 'Wil',
      surname: 'Fernandes',
      email: 'wilmar.wfjs@gmail.com',
      age: 25,
      gender: 'Masculino',
      class: 'Node.js',
      is_employed: 1,
      city: 'São Paulo'
    })
  })
})

describe('PATCH /v1/students/:id should', () => {
  test('update occurrence based on id', async () => {
    const response = await request(app)
      .patch('/v1/students/1')
      .send({
        name: 'Wil',
        surname: 'Fernandes',
      })
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      success: 'The record has been updated.'
    })

    const updatedData = await request(app).get('/v1/students/1')

    expect(updatedData.body[0].name).toBe('Wil')
    expect(updatedData.body[0].surname).toBe('Fernandes')
  })
})

describe('DELETE /v1/students/:id should', () => {
  test('delete occurrence based on id', async () => {
    const response = await request(app)
      .delete('/v1/students/1')

    expect(response.statusCode).toBe(204)
  })
})
