CI / CD

- Clone repo
- npm install
- Npm run test
- Heroku account
- Install heroku cli (its global)
- >heroku login
- >heroku create (bike shedding) : 
    - Creates app in heroku (https://desolate-wave-29030.herokuapp.com / | https://git.heroku.com/desolate-wave-29030.git)
    - Adds heroku in git remote 
    - Creates auth token (you can see it by >heroku auth:token)
- Heroku expects master branch. So pull to master, and pull from master, and checkout master
- Npm run deploy (to deploy bundle.js)
- In heroku, add database resource
- Seed database
    - >heroku run bash
    - >npm run seed
- Add environmental vars for google stuff
￼
- In google app, add the callback url and base url of our heroku app
￼
Continuous Integration
- Add the EccentricElves org to Travis

- Enable the repo for Travis

- Checkout to dev branch
- >npm run heroku-token
- In package.json, add the following line:
    - “build”: “webpack”

- That should do it!
