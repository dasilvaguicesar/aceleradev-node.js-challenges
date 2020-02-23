module.exports = (sequelize, DataTypes) =>
sequelize.define('monitors', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkedin: DataTypes.STRING
})