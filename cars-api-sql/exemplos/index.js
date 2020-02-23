const { makeQuery } = require ('./connect')

const insertQuery = `INSERT INTO cars_example (car_model, description, company, price, year, color, image_url) 
VALUES ('Peugeot 207', 'Carrinho Massa', 'Peugeot', 19950.30, 2011, 'Black', 'Not found');`

const selectQuery = 'SELECT * FROM cars_example;'

const insert = async () => {

    await makeQuery(insertQuery)

    const response = await makeQuery(selectQuery)

    console.log(response)
}


insert()