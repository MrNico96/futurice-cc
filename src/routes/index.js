const calculus = require('./calculus')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/public/index.html`)
    })
    app.get('/status', (req, res) => {
        res.status(200).send('Welcome to Calculus')
    })
    app.get('/calculus', calculus.makeCalculation)
}
