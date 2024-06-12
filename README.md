# Personal Best Survey
## About
This is a personal project to exercise using React.js, FastAPI, AWS.
**Current version** hosted in AWS Amplify [here](https://main.d3560oa79oks88.amplifyapp.com/).

<img src='https://github.com/tiramirez/minimalist_buying_club/assets/30816527/d3b91f85-0c6b-4512-bca3-27c805f504ba' width="800"/>


## Project structure
```
.
|- app
|  |- backend       ## FastAPI  / AWS Lambda
|  |- database      ## TBD
|  |- frontend      ## React.js / AWS Amplify
`- tools/
```

## Run
```
$ fastapi dev src/personal_best/backend/main.py
```


## Dependencies
### Backend
```
fastapi
pytest
sqlalchemy
```
### Frontend
* React.js

## Warnings
### Error with `npm start`
Solution
Solution (see [StackOverflow](https://stackoverflow.com/questions/69692842/)) mention to include `export NODE_OPTIONS=--openssl-legacy-provider` in `.env`
