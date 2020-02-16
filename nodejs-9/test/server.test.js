/*
  Que tal implementar os seus próprios testes de integração?
  Não é obrigatório e não terá impacto na nota final do desafio,
  mas fazê-los pode te dar mais certeza na hora de submeter! 
*/

const request = require('supertest')
const { app } = require('../src/server.js')

// Deixamos esses útils aqui pra vcs usarem nos hooks da api do jest
const { populateTable, cleanTable, connection } = require('./utils')

// Lembrando que vc pode usar esses hooks dentro do escopo das describes tbm!
beforeAll(() => {
    cleanTable('students_test')
})

beforeEach(() => {
    populateTable('students_test', {
        'name': 'Guilherme Cesar',
        'surname': 'Da Silva',
        'email': 'dasilvaguilhermecesar@gmail.com',
        'age': 31,
        'gender': 'Masculino',
        'class': 'Node.js',
        'is_employed': true,
        'city': 'Campinas'
    })
})

afterEach(() => {
    cleanTable('students_test')
})

afterAll(() => {
    connection.end()
})

describe('GET /v1/students should..', () => {

    test('return 200 as status code and an object with all itens', async () => {

        const res = await request(app).get('/v1/students')
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject([{
            'name': 'Guilherme Cesar',
            'surname': 'Da Silva',
            'email': 'dasilvaguilhermecesar@gmail.com',
            'age': 31,
            'gender': 'Masculino',
            'class': 'Node.js',
            'is_employed': 1,
            'city': 'Campinas'
        }])
    })

})

describe('GET /v1/students/:id should', () => {
    
    test('return 200 as status code and an object by id', async () => {

        const res = await request(app).get('/v1/students/1')
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject([{
        'name': 'Guilherme Cesar',
        'surname': 'Da Silva',
        'email': 'dasilvaguilhermecesar@gmail.com',
        'age': 31,
        'gender': 'Masculino',
        'class': 'Node.js',
        'is_employed': 1,
        'city': 'Campinas'}])
    })
})


describe('POST /v1/students should', () => {

    test('return 201 as status code and a message', async () => {

        const res = await request(app).post('/v1/students').send({
            'name': 'Guilherme Cesar',
            'surname': 'Da Silva',
            'email': 'dasilvaguilhermecesar@gmail.com',
            'age': 31,
            'gender': 'Masculino',
            'class': 'Node.js',
            'is_employed': 1,
            'city': 'Campinas'
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ success: 'A new record has been created.' })
    })
})

describe('PATCH /v1/students/:id should', () => {
    
    test('return 200 as status code and a message', async () => {
        const res = await request(app).patch('/v1/students/1').send({'age': 32,})
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({success: 'The record has been updated.'})
    })
})

describe('DELETE /v1/students/:id should', () => {
    
    test('return 204 as status code and a message', async () => {
        const res = await request(app).delete('/v1/students/1')
        expect(res.statusCode).toBe(204)
    })
})
