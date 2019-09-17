const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now()
  },
  status: {
    type: Sequelize.ENUM('pending', 'completed'),
    allowNull: false
  }
})

module.exports = Order
