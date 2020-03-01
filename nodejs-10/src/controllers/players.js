const playersModel = require('../models')['players']
const { Op } = require('sequelize')

let Players = {}

Players.getAll = async (req, res, next) => {
  const query = req.query
  if(query.nationality) {
    const data = await playersModel.findAll({
      where: {
        nationality: { [Op.eq]: query.nationality }
      }
    })
    res.status(200).json({
      total: data.length,
      data
    })
  } else if (query.score){
    const data = await playersModel.findAll({
      where: {
        score: { [Op.gte]: query.score }
      }
    })
    res.status(200).json({
      total: data.length,
      data
    })
  } else {
    const data = await playersModel.findAll({})
    res.status(200).json({
      total: data.length,
      data
    })
  }
}

Players.getById = async (req, res, next) => {
  const { playerId } = req.params
  const data = await playersModel.findOne({
    where: {id: playerId}
  })
  res.status(200).json(data)
}

Players.create = async (req, res, next) => {
  const data = await playersModel.create(req.body)
  res.status(201).json(data)
}

Players.update = async (req, res, next) => {
  const { playerId } = req.params
  await playersModel.update(req.body, {
    where: { id: playerId }
  })
  res.status(200).json({})
}

Players.delete = async (req, res, next) => {
  const { playerId } = req.params
  const result = await playersModel.destroy({
    where: { id: playerId }
  })
  res.status(204).json({})
}

module.exports = Players
