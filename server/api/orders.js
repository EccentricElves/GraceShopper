const router = require('express').Router()
const {Order, Art} = require('../db/models')

router.put('/:artId', async (req, res, next) => {
  try {
    const newOrder = await Order.findOrCreate({
      where: {
        userId: /*req.user.id*/ 1,
        status: 'pending'
      }
    })
    console.dir(newOrder)
    // set the art product of the item
    const artItem = await Art.findOne({
      where: {
        id: req.params.artId
      }
    })
    console.dir(artItem)

    //newOrder.addDetail(artItem)
    artItem.addOrder(newOrder)

    //user ---> order <---> item

    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
