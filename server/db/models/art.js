const Sequelize = require('sequelize')
const db = require('../db')

const Art = db.define('art', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://wallup.net/wp-content/uploads/2018/09/25/619118-blue_eyes-green_hair-elven-pointed_ears-video_games-Hearthstone-Warcraft-digital_art-artwork-Tyrande_Whisperwind-Moon-World_of_Warcraft-Blizzard_Entertainment-748x439.jpg',
    validate: {
      isUrl: true
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Art
