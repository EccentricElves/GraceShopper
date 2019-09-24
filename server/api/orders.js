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

// post /api/order/cart
// this route is called with data in localstorage.
// localstorage is to be merged with order
router.post('/cart', async (req, res, next) => {
  //first read if there is any guest cart passed in body
  let guestCart = []
  if (req.body.arts) guestCart = req.body.arts

  try {
    //now find or create pending order for user
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: [{model: Art}]
    })

    //insert from guestCart
    //should fail for duplicates
    for (let i = 0; i < guestCart.length; i++) {
      //first, get the art item for the id in the cart
      const artItem = await Art.findOne({
        where: {
          id: guestCart[i].id,
          inventory: 1
        }
      })

      //if the art item exists for the id, then insert it
      if (artItem) {
        await order.addArt(artItem, {through: {price: artItem.price}})
      }
    }

    //now return the cart data
    const userOrder = await Order.findOne({
      where: {
        id: order.id
      },
      include: [{model: Art}]
    })

    console.log('data being returned ', userOrder)
    res.json(userOrder)
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

// /api/order/history
// returns all the completed orders for the logged in user
router.get('/history', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.user.id,
        status: 'completed'
      },
      include: [{model: Art}]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
