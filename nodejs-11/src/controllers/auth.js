const jwt = require('jsonwebtoken')
const { auth } = require('../config')

let Auth = {}

Auth.getToken = async (req, res, next) => {
  const { body: { user, password } } = req

  if (user === auth.user && password === auth.password) {
    const token = jwt.sign({ user }, auth.secret, { expiresIn: '1h' })
    res.status(200).json({
      "token": token
    })
  } else {
    res.status(401).json({
      "error": "Invalid user or password."
    })
  }
}

module.exports = Auth
