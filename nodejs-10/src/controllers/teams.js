const teamsModel = require('../models')['teams']
const playersModel = require('../models')['players']

let Teams = {}

Teams.getAll = async (req, res, next) => {
  const data = await teamsModel.findAll({
    include: playersModel
  })
  res.status(200).json({
    total: data.length,
    data
  })
}

Teams.getById = async (req, res, next) => {
  const { teamId } = req.params
  const data = await teamsModel.findOne({
    where: { id : teamId },
    include: playersModel
  })
  res.status(200).json(data)
}

Teams.getTeamPlayers = async (req, res, next) => {
  const { teamId } = req.params
  const data = await playersModel.findAll({
    where: {teamId: teamId},
  })
  res.status(200).json({
    total: data.length,
    data
  })
}

Teams.create = async (req, res, next) => {
  const data = await teamsModel.create(req.body)
  res.status(201).json(data)
}

Teams.update = async (req, res, next) => {
  const { teamId } = req.params
    await teamsModel.update(req.body, {
    where: { id: teamId }
  })
  res.status(200).json({})
}

Teams.delete = async (req, res, next) => {
  const { teamId } = req.params
  await teamsModel.destroy({
    where: { id: teamId }
  })

  res.status(204).json({})
}

module.exports = Teams
