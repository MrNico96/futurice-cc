const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const port = process.env.PORT || 3334

const app = express()

app.use(express.json())

app.use(cors())

// HTTP Logger
app.use(morgan('combined'))

// define routes
app.use(express.static(__dirname + '/public'));
require('./routes/')(app)

app.listen(port, () => {
    console.info(`Application listening on port ${port}`)
})

module.exports = app;