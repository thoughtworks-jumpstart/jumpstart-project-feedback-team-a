# README

## Required Plugins for VS Code

You need to install the following plugins for VS Code.

### Debugger for Chrome

### ESLint

### Jest

### Prettier - Code formatter

## After checkout

Run the following commands

```shell
yarn install
```

## Setup your local MongoDB

To run the server locally, you need a connection to some MongoDB instance.

If you installed the MongoDB on your machine, you can start it with

```shell
mongod --dbpath /path/to/mongodb/storage/directory
```

Note that the `/path/to/mongodb/storage/directory` should exist and you have write permission to it.

## Configure your local .env file

In the `server` directory, you need to add one `.env` file.

You can follow the example in `.env.example` file.

* PORT
  * This is the port number that the server listens on
* FRONTEND_PORT
  * This is the port number that the frontend web server listens on. You only need to set this when you run this application locally
* SYSTEM_EMAIL_ADDRESS
  * This is the email address to be used as from-address when the application sends emails to users
* APPLICATION_NAME
  * This is the name of your application
* NODE_ENV
  * This needs to be set to 'production' in your production deployment environment. Set it to 'local' when you run the server locally.
* MONGODB_URI
  * If you run the server locally, you need to set this to your local MongoDB instance URI.
  * In Heroku, This should have been automatically set by Heroku when you add an `mLab` add-on
* SECRET
  * You need to choose a random secret to sign JWT tokens during authentication
* MAILGUN_API_KEY
  * To send emails via MAILGUN service, you need to register one account on MAILGUN and get an API key
* MAILGUN_DOMAIN
  * This is your MAILGUN domain (you can find it at https://app.mailgun.com/app/domains)

## Start both client and server locally

```shell
yarn start
```

## Deploy to Heroku

This project follows the setup as described in [Running Create React App and Express (CRAE) on Heroku](https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851), except that I didn't use babel on the server side.

You can follow the steps below to deploy this application to Heroku.

### Steps

1.  Create a new application on heroku and link it with the github repository

2.  configure a new add-on for MongoDB (e.g. the one from mLab)

3.  configure environment variables in Heroku application settings

You need to configure the environment variables you have put in the `server/.env` file, except for `PORT` and `FRONTEND_PORT`

4.  deploy the application

### Deployment Script

```shell
// navigate to the root of your project
// login to Heroku (if you aren't already)
heroku login

// create your heroku project, make sure to replace name-of-my-app, // with the actual name of your app. Note, this name must be unique // across of all heroku.
heroku create name-of-my-app

// add the latest nodejs build pack to our project
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn

// add mongodb add-on
heroku addons:create mongolab:sandbox

// set environment variables

heroku config:set NODE_ENV=production
heroku config:set SECRET=choose_your_secret_for_jwt_token_signing
heroku config:set MAILGUN_API_KEY=your_mailgun_api_key
heroku config:set MAILGUN_DOMAIN=your_mailgun_domain
heroku config:set SYSTEM_EMAIL_ADDRESS=no-reploy@yourdomain.com
heroku config:set APPLICATION_NAME=yourdomain.com

// push our code to heroku.  This step will take the longest
git push heroku master
// let's launch your app
heroku open
```

## Deploy to Production

Pre-requisite: Do your Check-In-Dance!

\*_Reminder: Perform local cypress test._

You can follow the steps below to deploy this application to Heroku (Production site)

### Steps

#### Confirmation from PO

1.  Proceed to Heroku "staging" app site: https://my-feedback-team-a-staging.herokuapp.com/

2.  Demo latest working app to Product Owner for confirmation to deploy to production.

3.  Once confirmed, proceed to Heroku dashboard --> apps --> my-feedback-team-a-prod.

#### Backing up Database

4.  Under overview tab, click on mLab MongoDB.

5.  In mlab dashboard, click on "Backups" and click on "Take one-time mongodump".

6.  Ensure BACKUP TYPE = Mongodump and Cloud container type = mLab-owned. **\*_$0.50 will be charged per backup!_**

7.  Upon submit, mLab will perform a backup.

8.  Download the backup and share it on Slack.

#### Push from deploy-toprod-branch

9.  Go into branch for production


```shell
   git checkout deploy-to-prod
```

10. Merge master branch into deploy-to-prod


```shell
   git merge master
```

11. Run yarn test and cypress test locally.

12. Once all tests passed, push from deploy-to-prod (be explicit)


```shell
  git push origin deploy-to-prod
```

13. Do not stay on deploy-to prod branch


```shell
  git checkout master
```

14. Ensure passing tests on Travis CI

15. Log on to Heroku production site: https://my-feedback-team-a-prod.herokuapp.com/

## Thanks

While working on this project, I learnt a lot of useful tips from the following projects:

* [megaboilerplate](https://github.com/sahat/megaboilerplate/)
* [node-express-realworld-example-app](https://github.com/gothinkster/node-express-realworld-example-app)
* [Running Create React App and Express (CRAE) on Heroku](https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851)
