const express = require('express')
const router = express.Router()
const controller = require('../controllers/teams')
const auth = require('../middlewares/auth')

router.get('/', controller.getAll)

router.get('/:teamId', controller.getById)

router.post('/', auth ,controller.create)

router.patch('/:teamId',  auth ,controller.update)

router.delete('/:teamId', auth ,controller.delete)

module.exports = router
