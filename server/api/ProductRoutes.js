const router = require('express').Router()
const {Art} = require('../db/models')
module.exports = router

//GET ALL ART
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Art.findAll({
      where: {
        inventory: 1
      }
    })
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

//GET SINGLE ART
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Art.findByPk(req.params.id)
    console.log('SINGLE PRODUCT', singleProduct)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
