// Integration Tests Scenarios for Cars API

const request = require('supertest')
const server = require('../src/server')
const { populateDB, cleanDB } = require('./utils')
const data = {
    car_model: "Peugeot 207",
    description: "Carrinho Massa",
    company: "Peugeot",
    price: 19950.30,
    year: 2011,
    color: "Black",
    image_url: "Not found"
}

beforeAll(() => cleanDB())
beforeEach(() => populateDB(data))
afterEach(() => cleanDB())
afterAll(() => cleanDB())

describe('The API on /v1/cars Endpoint at GET method should...', () => {
    test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {

        const res = await request(server.app).get('/v1/cars')
        expect(res.statusCode).toEqual(200)
        expect(Object.keys(res.body)).toMatchObject(['total', 'data'])
    })

    test('return the right number of items and an object with all items', async () => {
        const res = await request(server.app).get('/v1/cars')
        const expected = [{
            "car_model": "Peugeot 207",
            "color": "Black",
            "company": "Peugeot",
            "description": "Carrinho Massa",
            "id": 1,
            "image_url": "Not found",
            "price": 19950.3,
            "year": 2011
        }]
        expect(res.body.total).toEqual(1)
        expect(res.body.data).toMatchObject(expected)
    })

    test(`return the 'data' property with all items from DB`, async () => {
        const res = await request(server.app).get('/v1/cars')
        expect(res.body).toMatchObject({
            total: 1,
            data:
                [{
                    id: 1,
                    car_model: 'Peugeot 207',
                    description: 'Carrinho Massa',
                    company: 'Peugeot',
                    price: 19950.3,
                    year: 2011,
                    color: 'Black',
                    image_url: 'Not found'
                }]
        }
        )
    })
})

describe('The API on /v1/cars/:id Endpoint at GET method should...', () => {
    test(`return 200 as status code and the item founded`, async () => {
        const res = await request(server.app).get('/v1/cars/1')

    const expected = [{
        "car_model": "Peugeot 207",
        "color": "Black",
        "company": "Peugeot",
        "description": "Carrinho Massa",
        "id": 1,
        "image_url": "Not found",
        "price": 19950.3,
        "year": 2011,
        },]
    
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(expected)
    })

    test(`return 404 as status code and error message if the item doesn't exists and couldn't be found`, async () => {
        const res = await request(server.app).get('/v1/cars/100')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toMatchObject({error: `The record "100" couldn't be found.`})
    })
})

describe('The API on /v1/cars Endpoint at POST method should...', () => {
    test(`return 201 as status code and return the item added`, async () => {
        const data = {
            car_model: "Montana",
            description: "1.8 Sport",
            company: "GM",
            price: 18.000,
            year: 2004,
            color: "Silver",
            image_url: "Not found"
        }
        const res = await request(server.app).post('/v1/cars').send(data)
        const expected =  {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 2,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        }
        expect(res.statusCode).toEqual(201)
        expect(res.body).toMatchObject(expected)
    })

    test(`save on database the new item added`, async () => {
        // ...Entender teste
    })
})

describe('The API on /v1/cars/:id Endpoint at PATCH method should...', () => {
    test(`return 200 as status code and return the item changed`, async () => {
        const dataToUpdate = {"color": "Silver"}
        const res = await request(server.app).patch('/v1/cars/1').send(dataToUpdate)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({
            "affectedRows": 1,
            "changedRows": 1,
            "fieldCount": 0,
            "insertId": 0,
            "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
            "protocol41": true,
            "serverStatus": 2,
            "warningCount": 0}
        )

    })

    test(`return 404 as status code and error message if the item doesn't exists and couldn't be updated`, async () => {
        const dataToUpdate = {"color": "Silver"}
        const res = await request(server.app).patch('/v1/cars/100').send(dataToUpdate)
        expect(res.statusCode).toEqual(404)
    })

    test(`save on database the item changed`, async () => {
        // ...Entender teste
    })
})

describe('The API on /v1/cars/:id Endpoint at DELETE method should...', () => {
    test(`return 204 as status code to a item deleted successfully`, async () => {
        const res = await request(server.app).delete('/v1/cars/1')
        expect(res.statusCode).toEqual(204)
    })

    test(`return 404 as status code and error message if the item doesn't exists and couldn't be deleted`, async () => {
        const res = await request(server.app).delete('/v1/cars/100')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toMatchObject({error: `The record "100" couldn't be found.`})
    })

    test(`remove from database the item that should be deleted`, async () => {
        // ...Entender teste
    })
})
