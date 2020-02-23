const { cars: {
    create,
    destroy
  } } = require('../src/model/index')

const populateDB = async (data) => {
    await create(data)
}

const cleanDB = async () => {
    await destroy()
}

module.exports = {
    populateDB,
    cleanDB
}