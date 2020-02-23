const express = require('express')
const router = express.Router()
const students = require('./students')
const monitors = require('./monitors')

router.get('/', (req, res) => {
  res.json({
    students: 'http://localhost:8080/v1/students',
    monitors: 'http://localhost:8080/v1/monitors'
  })
})

router.use('/students', students)
router.use('/monitors', monitors)

module.exports = router
