const router = require('express').Router()
const {Order, Art} = require('../db/models')

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId
      },
      include: [{model: Art}]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/:artId', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })

    const artItem = await Art.findOne({
      where: {
        id: req.params.artId
      }
    })

    // the concept of an Order Model having a quantity column to keep track of amt
    // in this case we would establish the association Art.hasMany(Order)
    // so our query for this route could search artId: req.params.artId
    // order.update({quantity: order.quantity + 1})

    order.addArt(artItem)

    //user ---> order <---> item

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
