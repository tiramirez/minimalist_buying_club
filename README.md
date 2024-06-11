# Personal Best Survey
## About
This is a personal project to exercise using React.js, FastAPI, AWS.
Current version hosted in AWS Amplify (here)[https://main.d3560oa79oks88.amplifyapp.com/].


## Project structure
```
.
|- app
|  |- backend       ## FastAPI
|  |- database      ## SQLite / Postgress
|  |- frontend      ## React.js
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
Solution ((stackoverflow)[https://stackoverflow.com/questions/69692842/]) mention to include `export NODE_OPTIONS=--openssl-legacy-provider` in `.env`
