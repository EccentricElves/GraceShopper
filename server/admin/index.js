const router = require('express').Router()
const {User, Art} = require('../db/models')

// edit users --> escalate privileges, delete/add/edit user
// edit products --> add/edit/delete products

async function isAdmin(req, res, next) {
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  })
  if (!currentUser.isAdmin()) {
    return res.status(403).json('Not even supposed to be here')
  }
  next()
}

//??
// router.use('*', isAdmin, (req, res, next) => {
//     next()
// })

router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

router.delete('/users/delete/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
