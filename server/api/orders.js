const router = require('express').Router()
const {Order, Art} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id
      },
      include: [{model: Art}]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/add/:artId', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })

    const artItem = await Art.findOne({
      where: {
        id: req.params.artId,
        inventory: 1
      }
    })

    if (!artItem) {
      res.sendStatus(204)
    }

    order.addArt(artItem)

    //user ---> order <---> item

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
