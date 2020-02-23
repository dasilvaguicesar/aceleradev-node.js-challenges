const express = require('express')
const router = express.Router()
const controller = require('../controllers/monitors')

router.get('/', controller.getAll)

router.get('/:monitorsId', controller.getById)

router.post('/'/* , controller.create */)

router.put('/:monitorsId'/* , controller.update */)

router.delete('/:monitorsId'/* , controller.delete */)

module.exports = router
