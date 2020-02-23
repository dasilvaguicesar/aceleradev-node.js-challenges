const db = require('../db/index') // Verificar
const { connection } = require('../db/index') // Verificar

const cars = {
    findAll: async () => await db.query('SELECT * FROM cars_example'),

    findById: async id => {
        const carById = await db.query(`SELECT * FROM cars_example WHERE id=${id}`)
        if (carById.length === 0) {
            return undefined 
        } else {
            return carById
        }     
    },

    create: async data => {
        const insert = `INSERT INTO cars_example (car_model, description, company, price, year, color, image_url) 
        VALUES (${"'" + data.car_model + "'"}, ${"'" + data.description + "'"}, ${"'" + data.company + "'"}, ${data.price}, ${data.year}, ${"'" + data.color + "'"}, ${"'" + data.image_url + "'"});`
        return await db.query(insert);
    },

    update: async (data, id) => {
        const formattedData = []
        Object.keys(data).reduce((total, currentValue, currentIndex, arr) => {
            let valueKey = data[currentValue]
            if (currentValue !== 'price' && currentValue !== 'year'){
                valueKey = `'${valueKey}'`
            }
            formattedData.push(`${currentValue}=${valueKey}`)
        },0)
        const updateConfirmation = await db.query(`UPDATE cars_example SET ${formattedData} WHERE id=${id}`)
        if(!updateConfirmation.changedRows){
            return false
        }
        return updateConfirmation
    },

    delete: async id => {
        const deletedData = await db.query(`DELETE from cars_example WHERE id=${id}`)
        if(!deletedData.affectedRows) {
            return false
        } else {
            return deletedData
        }
    },

    destroy: async () => await db.query(`TRUNCATE TABLE cars_example`)
}

module.exports = { cars, connection }