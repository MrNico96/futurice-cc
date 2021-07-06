# Futurice Calculus :pager: :rocket:
The task was solved with the help of an ExpressJS web application.

:earth_americas: [Calculus Demo](https://futurice-cc.herokuapp.com/)

1. [HEROKU Deployment](#heroku-deployment)
2. [Local Development](#run-it-local)
3. [Endpoints](#endpoints)
4. [Helpful Links](#helpful-links)
5. [Disclaimer](#disclaimer)


# Heroku Deployment
With the help of [GitHub Actions](.github/workflows/main.yml), after each source code change, the source code is first tested with the [defined tests](test/). Then a [Docker](Dockerfile) image is built and delivered to HEROKU.


# Run it local
The entire application is contained within the `app.rb` file.
## Install
    npm install
### Run the app
    npm start
    or with better nodedeam
    npm dev
### Run the tests
    npm run test

## Or with Docker
    docker build -t futuricecccalculus .
    docker run -d  --name calculus-app -p 81:81 -e PORT=81 futuricecccalculus
*If the port is not set, 3334 is the default.*


# Endpoints
The REST API to the example app is described below.

## Get result for a calculation

### Request

`GET /calculus?query={calculation-string-with-base64-encoded}`

    curl -i -H 'Accept: application/json' http://localhost:3334/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 44
    Date: Tue, 06 Jul 2021 20:18:59 GMT
    Connection: keep-alive
    
    {"error":false,"result":-132.88888888888889}


## Status / Health Check 

### Request

`GET /status`

    curl -i -H 'Accept: application/json' http://localhost:3334/status

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 27
    Date: Tue, 06 Jul 2021 20:18:59 GMT
    Connection: keep-alive
    
    Welcome to Calculus

# Helpful Links
- [Node.js Documentation](https://expressjs.com/de/api.html)
- [Express.js Documentation](https://expressjs.com/de/api.html)
- [Docker Documentation](https://expressjs.com/de/api.html)

# Disclaimer
This application uses an **eval()** function. The input is checked beforehand by a regex expression, but it would be safer to use a maths library like [MathJs](https://mathjs.org/), which works without eval() [since version 4](https://mathjs.org/docs/expressions/security.html).
I decided not to use it in the assignment because I wasn't sure if it would be accepted to use a maths library that would solve more or less the whole assignment.
