const { NODE_ENV } = process.env
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (request, response) => {
  // Implemente o método correspondete a rota GET /v1/students
  const allStudents = await queryHelper(`SELECT * FROM ${table}`)
  response.status(200).send(allStudents)
  return allStudents
}

const getById = async (request, response) => {
  // Implemente o método correspondete a rota GET /v1/students/:id
  const studentId = request.params.studentId
  const studentById = await queryHelper(`SELECT * FROM ${table} WHERE id=${studentId}`)
  response.status(200).send(studentById)
  return studentById
}

const create = async (request, response) => {
  // Implemente o método correspondete a rota POST /v1/students
  const studentData = request.body
  response.status(201).send({success: 'A new record has been created.'})
  const formattedStudentData = insertFormatter(studentData)
  const { columns, values } = formattedStudentData
  const dbReturn = await queryHelper(`INSERT INTO ${table} (${columns}) VALUES (${values})`)
  return dbReturn
}

const updateById = async (request, response) => {
  // Implemente o método correspondete a rota PATCH /v1/students/:id
  const studentId = request.params.studentId
  const studentDataToUpdate = request.body
  response.status(200).send({success: 'The record has been updated.'})
  const formattedStudentData = updateFormatter(studentDataToUpdate)  
  const studentUpdatedById = await queryHelper(`UPDATE ${table} SET ${formattedStudentData} WHERE id=${studentId}`)
  return studentUpdatedById
}

const deleteById = async (request, response) => {
  // Implemente o método correspondete a rota DELETE /v1/students/:id
  const studentId = request.params.studentId
  response.status(204).send({})
  const deleteStudent = await queryHelper(`DELETE FROM ${table} WHERE id=${studentId}`)
  return deleteStudent
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
