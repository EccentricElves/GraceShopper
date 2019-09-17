const router = require('express').Router()
const {Art} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Art.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})
