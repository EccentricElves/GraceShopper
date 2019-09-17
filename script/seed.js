'use strict'

const db = require('../server/db')
const {User, Art, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      address: '5 Hanover Pl.',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'Murphy',
      address: '2 Wall St.',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const arts = await Promise.all([
    Art.create({
      name: 'Pablo',
      artist: 'Picasso',
      price: 30000.24
    }),
    Art.create({
      name: 'Mona',
      artist: 'Lisa',
      price: 9000000.99
    }),
    Art.create({
      name: 'Leo',
      artist: 'Da Vinci',
      price: 0.99
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: 'pending'
    }),
    Order.create({
      status: 'completed'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
