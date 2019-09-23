CI / CD

* Clone repo
* npm install
* Npm run test
* Heroku account
* Install heroku cli (its global)
* > heroku login
* > heroku create (bike shedding) :
  * Creates app in heroku (https://desolate-wave-29030.herokuapp.com / | https://git.heroku.com/desolate-wave-29030.git)
  * Adds heroku in git remote
  * Creates auth token (you can see it by >heroku auth:token)
* Heroku expects master branch. So pull to master, and pull from master, and checkout master
* Npm run deploy (to deploy bundle.js)
* In heroku, add database resource
* Seed database
  * > heroku run bash
  * > npm run seed
* Add environmental vars for google stuff
  ￼![heroku environment variables](https://raw.githubusercontent.com/rushilshakya/GraceShopper/dev/img/googleOauthConfig.jpg)

* In google app, add the callback url and base url of our heroku app
  ￼![google console](https://raw.githubusercontent.com/rushilshakya/GraceShopper/dev/img/herokuEnv.jpg)

Continuous Integration

* Add the EccentricElves org to Travis
  ￼![Travis dashboard](https://raw.githubusercontent.com/rushilshakya/GraceShopper/dev/img/travisOrgs.jpg)

* Enable the repo for Travis
  ￼![Travis enable repo](https://raw.githubusercontent.com/rushilshakya/GraceShopper/dev/img/travisEnableRepo.jpg)

* Checkout to dev branch
* > npm run heroku-token
* In package.json, add the following line: - “build”: “webpack”
  ￼![Travis enable repo](https://raw.githubusercontent.com/rushilshakya/GraceShopper/dev/img/webpack.jpg)

* That should do it!
