# Health Informatics Practicum Project
___
## Setup
```
$ npm install
```
##  Run
```
$ npm start
```
---
## Info:
- App entry point is app.js
- Route handler functions are in routes directory
- db is a mock directory to hold some random json data (queried by /search endpoint)
- Helper functions for miscellaneous tasks are in utils directory

## Email functionality(Twilio):

- npm install --save @sendgrid/mail

- Create your send grid account on https://app.sendgrid.com/
- Verify your single sender email Id through Settings->Sender Authentication
- Generate an api key (Settings->API Keys-> Create API key)