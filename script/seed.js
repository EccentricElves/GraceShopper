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
      password: '123',
      securityClearance: 'admin'
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
      name: 'The Elvenking',
      artist: 'Thranduil',
      price: 30000,
      imageURL: 'https://wallpapercave.com/wp/wp2032826.jpg'
    }),
    Art.create({
      name: 'Greenleaf',
      artist: 'Legolas',
      price: 9000000,
      imageURL: 'https://images.spot.im/v1/production/rmespf2ymaab7gaf3rgn'
    }),
    Art.create({
      name: 'Elf',
      artist: 'Buddy',
      price: 9000000,
      imageURL: 'https://i.ytimg.com/vi/SwvfxmxbmhM/maxresdefault.jpg'
    }),
    Art.create({
      name: 'The Betrayer',
      artist: 'Illidan Stormrage',
      price: 900000,
      imageURL:
        'https://o.aolcdn.com/images/dims?quality=85&image_uri=http%3A%2F%2Fwww.blogcdn.com%2Fwow.joystiq.com%2Fmedia%2F2011%2F02%2Fillidan.jpg&client=amp-blogside-v2&signature=55f4b119ec567c4c15070672b7283b3efe210c96'
    }),
    Art.create({
      name: 'The Banshee Queen',
      artist: 'Sylvanas Windrunner',
      price: 2000000,
      imageURL:
        'https://blizzardwatch.com/wp-content/uploads/2016/04/sylvanas-legion-header-674x380.jpg'
    }),
    Art.create({
      name: 'The Hero of Hyrule',
      artist: 'Link',
      price: 1500000,
      imageURL:
        'https://www.wallpaperup.com/uploads/wallpapers/2012/10/13/19209/0708d1c54c034f272c82aed91aa2b436-700.jpg'
    }),
    Art.create({
      name: 'The House Elf',
      artist: 'Dobby',
      price: 100,
      imageURL:
        'https://images.ladbible.com/thumbnail?type=jpeg&url=http://beta.ems.ladbiblegroup.com/s3/content/3e9cf6315ae9b21d8b6316bbea52b07d.png&quality=70&width=720'
    }),
    Art.create({
      name: 'Uncommonly Good!',
      artist: 'Ernest J. Keebler',
      price: 300,
      imageURL:
        'https://hobbydb-production.s3.amazonaws.com/processed_uploads/subject_photo/subject_photo/image/11770/1457757988-22630-4572/Ernie_20Keebler_large.jpg'
    }),
    Art.create({
      name: 'Snap, Crackle and Pop!',
      artist: 'Kellogs',
      price: 1000,
      imageURL: 'http://popicon.life/wp-content/uploads/2017/06/169snapcp.jpg'
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
