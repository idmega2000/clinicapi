# clinicapi
A simple clinic data search


[![Build Status](https://travis-ci.org/idmega2000/clinicapi.svg?branch=dev)](https://travis-ci.org/idmega2000/clinicapi)[![Coverage Status](https://coveralls.io/repos/github/idmega2000/clinicapi/badge.svg?branch=dev)](https://coveralls.io/github/idmega2000/clinicapi?branch=dev) [![Maintainability](https://api.codeclimate.com/v1/badges/47a5e77af394185999b5/maintainability)](https://codeclimate.com/github/idmega2000/clinicapi/maintainability)


## Technologies
1. [Nodejs](https://nodejs.org/en/)
2. [Express](https://expressjs.com/)
4. [Babel](https://babeljs.io/)
5. [Eslint](https://eslint.org/) and [airbnb style guide](https://github.com/airbnb/javascript)
6. [mocha](https://mochajs.org)



Visit App [Here](https://clientapi-search.herokuapp.com/)
Visit Url for search [Here](https://clientapi-search.herokuapp.com/api/v1/clinic)
Visit Swagger doc [Here](https://clientapi-search.herokuapp.com/docs)

|  Functionality     |Http Request   | Api endpoints    |
|  -------------     | ------------- | ---------------- |
| Search Clinic | GET           | /api/v1/clinic         |



Where deployed locally, make a get request to /api/v1/clinic
## Notes

- The app uses absolute imports.
- The app also uses global exception error handling.
- All logic exceptions are thrown in service files(good practive for easy maintanance).

## Setup Project
To setup project
- clone project `git clone https://github.com/idmega2000/clinicapi.git` and cd into the folder
- run `npm install`
- set up the environment variable copy and update frome envsample
- start the app on dev with `npm run dev`

## Clinic Search request Parameters
- Name [ex: "Mayo Clinic" or "ayo"]
- State [ex: "CA" or "California"]
- AvailabileFrom [ex: from:09:00]
- AvailabileTo [ex: 16:00]
- pageNumber [ex: 2]
- pageLimit [ex: 10]


## Clinic search Response
Below is a sample of the search
sample response
```
    "name": "Mayo Clinic",
    "stateName": "Florida",
    "stateCode": "FL",
    "availability": {
        "from": "09:00",
        "to": "20:00"
    },
    "clinicType": "Dental"
```

name: The name of the clinic
stateName: the state name the clinic is
stateCode: the state code 
availability is the time the clinic is available
clinicType is the type of clinic [ex Dental or Vetenary]


## Running the tests
​Test was writting with mocha, chai and sinon(for external api mocking)
After setting up the project you should run the command below to run the test
- `npm run test`

## Development notes
ES6 is used for the devoplopment
Javascript Classes are used entirely in this project with name of class same as name of File

- Parrallel api fetching for fetching the clinic data
- only one of the gotten data is looped while accessinf the other in the loop
- Care is taken not to loop the state array data at every search so it is packed in a object(for better search)
- Much attention was taken into reducing the amount of looping.
