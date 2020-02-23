#!/usr/bin/env node

const db = require('../model/')

db.sequelize.sync()
  .then(() => process.exit(0))
