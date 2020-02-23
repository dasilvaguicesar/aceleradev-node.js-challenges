// Unit Tests Scenarios for Model of Cars API

const { cars: {
    findAll,
    findById,
    update,
    create,
    destroy
}, connection } = require('./index')

const { populateDB, cleanDB } = require('../../tests/utils')

const data = {
    car_model: "Peugeot 207",
    description: "Carrinho Massa",
    company: "Peugeot",
    price: 19950.30,
    year: 2011,
    color: "Black",
    image_url: "Not found"
}

beforeAll(() => {
    cleanDB()
})

beforeEach(() => {
    populateDB(data)
})

afterEach(() => {
    cleanDB()
})

afterAll(() => {
    connection.end()
})

describe('Method findAll should...', () => {
    
    test('return all records on database', async () => {
        const expected = [{
            "id": 1,
            "car_model": 'Peugeot 207',
            "description": 'Carrinho Massa',
            "company": 'Peugeot',
            "price": 19950.3,
            "year": 2011,
            "color": 'Black',
            "image_url": 'Not found'
        }]
        expect(await findAll()).toEqual(expected)
    })
})

describe('Method findById should...', () => {

    test('return the properly record based on the id passed', async () => {
        const id = 1
        const expected = [{
            "id": 1,
            "car_model": "Peugeot 207",
            "color": "Black",
            "company": "Peugeot",
            "description": "Carrinho Massa",
            "image_url": "Not found",
            "price": 19950.3,
            "year": 2011
        }]
        expect(await findById(id)).toMatchObject(expected)
    })

    test('return undefined when the record has not been found', async () => {
        expect(await findById(100)).toEqual(undefined)
    })

})

describe('Method update should...', () => {

    test('update a record and return it updated', async () => {
        const id = 1
        const dataUpdate = { price: 10000, color: "White" }
        const expected = {
            "affectedRows": 1,
            "changedRows": 1, "fieldCount": 0,
            "insertId": 0, 
            "message": "(Rows matched: 1  Changed: 1  Warnings: 0", 
            "protocol41": true,
            "serverStatus": 2,
            "warningCount": 0
        }
        expect(await update(dataUpdate, id)).toMatchObject(expected)
    })

    test('return null if record not founded in database', async () => {
        const id = 100
        const dataUpdate = { color: "White" }
        const updatedData = await update(dataUpdate, id)
        expect(updatedData).toEqual(false)
    })
})


describe('Method create should...', () => {

    test('create a new record in database and return it', async () => {
        const data = {
            car_model: "Peugeot 207",
            description: "Carrinho Massa",
            company: "Peugeot",
            price: 19950.30,
            year: 2011,
            color: "Black",
            image_url: "Not found"
        }
        const expected = {
            "affectedRows": 1,
            "changedRows": 0,
            "fieldCount": 0,
            "message": "",
            "protocol41": true,
            "serverStatus": 2,
            "warningCount": 0,
        }
        expect(await create(data)).toMatchObject(expected)
    })

    test('return an object with properly keys', async () => {
        // Entender o teste
    })
})

describe('Method destroy should...', () => {
    test('clear DB', async () => {
        const expected = {
            "affectedRows": 0,
            "changedRows": 0,
            "fieldCount": 0,
            "insertId": 0, "message": "",
            "protocol41": true,
            "serverStatus": 2,
            "warningCount": 0
        }
        expect(await destroy()).toMatchObject(expected)
    })
})

describe('Method updateDB should...', () => {
    // Entender o teste
})
