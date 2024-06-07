# Personal Best Survey
## About
This is a personal projecto to exercise using FastAPI. 

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

# Error with npm start. Solution https://stackoverflow.com/questions/69692842/
Solutions mention to include `export NODE_OPTIONS=--openssl-legacy-provider` in `.env`