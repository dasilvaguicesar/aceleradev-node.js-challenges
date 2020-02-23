const { monitors } = require('../models')

const getAll = async (req, res, next) => {

    try {
        const data = await monitors.findAll({})
    res.status(200).json({
        total: data.length,
        data
    })}
    catch (error){
        console.log(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { monitorsId } = req.params
        const data = await monitors.findOne( {
            where: { id: monitorsId }
        })
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll,
    getById
}