const router = require('express').Router()
const {Order, Art} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: [{model: Art}]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    const carts = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: [{model: Art}]
    })
      .then(cart => cart.update({status: 'completed'}))
      .then(cart => {
        cart.arts.map(art => art.update({inventory: 0}))
      })
    res.json(carts)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart/remove/:artId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })

    const artToRemove = await Art.findOne({
      where: {
        id: req.params.artId
      }
    })

    order.removeArt(artToRemove)
    res.status(202).json(artToRemove)
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

    order.addArt(artItem, {through: {price: artItem.price}})

    //user ---> order <---> item

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
