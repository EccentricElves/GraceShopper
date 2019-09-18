const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('OrderDetail', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderDetail
