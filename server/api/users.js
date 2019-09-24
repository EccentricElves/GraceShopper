const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function isAccessGranted(req, res, next) {
  // Here your authorization logic (jwt, OAuth, custom connection logic...)
  if (!req.user || req.user.securityClearance !== 'admin')
    return res.status(403).json('HEY GUY, WRONG PLACE')
  next()
}
function isUserAccessGranted(req, res, next) {
  if (req.user.id.toString() !== req.params.id)
    return res.status(403).json('HEY GUY, WRONG PLACE')
  else next()
}

router.get('/', isAccessGranted, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'address', 'googleId', 'userImage']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isUserAccessGranted, async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: {
        id: req.user.id
      },
      attributes: ['id', 'name', 'email', 'address', 'googleId', 'userImage']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})
