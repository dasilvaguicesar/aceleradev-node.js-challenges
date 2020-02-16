const { NODE_ENV } = process.env
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (request, response) => {
  // Implemente o método correspondete a rota GET /v1/students
  const allStudents = await queryHelper(`SELECT * FROM ${table}`)
  response.status(200).json(allStudents)
}

const getById = async (request, response) => {
  // Implemente o método correspondete a rota GET /v1/students/:id
  const studentId = request.params.studentId
  const studentById = await queryHelper(`SELECT * FROM ${table} WHERE id=${studentId}`)
  response.status(200).json(studentById)
}

const create = async (request, response) => {
  // Implemente o método correspondete a rota POST /v1/students
  const studentData = request.body
  const formattedStudentData = insertFormatter(studentData)
  const { columns, values } = formattedStudentData
  await queryHelper(`INSERT INTO ${table} (${columns}) VALUES (${values})`)
  response.status(201).json({success: 'A new record has been created.'})
}

const updateById = async (request, response) => {
  // Implemente o método correspondete a rota PATCH /v1/students/:id
  const studentId = request.params.studentId
  const studentDataToUpdate = request.body
  const formattedStudentData = updateFormatter(studentDataToUpdate)  
  await queryHelper(`UPDATE ${table} SET ${formattedStudentData} WHERE id=${studentId}`)
  response.status(200).json({success: 'The record has been updated.'})
}

const deleteById = async (request, response) => {
  // Implemente o método correspondete a rota DELETE /v1/students/:id
  const studentId = request.params.studentId
  await queryHelper(`DELETE FROM ${table} WHERE id=${studentId}`)
  response.status(204).json({})
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
