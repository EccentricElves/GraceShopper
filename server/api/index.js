const router = require('express').Router()
module.exports = router

function isAccessGranted(req, res, next) {
  // Here your authorization logic (jwt, OAuth, custom connection logic...)
  if (!req.user || req.user.securityClearance !== 'admin')
    return res.status(403).json('HEY GUY, WRONG PLACE')
  next()
}

router.use('/users', isAccessGranted, require('./users'))
router.use('/art', require('./ProductRoutes'))
router.use('/order', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
