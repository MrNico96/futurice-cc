const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')

// Set Assertion and chai-HTTP
chai.should()
chai.use(chaiHttp)

describe('Testing GET /calculus Endpoint', () => {
    describe('Testing valid Expressions', () => {
        it('Calculation of 9/2+2+3-9*2 - should be a success', (done) => {
            chai.request(server)
                .get('/calculus?query=OS8yKzIrMy05KjI=')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.error.should.be.equal(false)
                    res.body.result.should.be.a('number')
                    res.body.result.should.be.equal(-8.5)
                    done()
                })
        })
        it('Calculation of 45+5/(7*82+2-(218-1)*2)-19 - should be a success', (done) => {
            chai.request(server)
                .get('/calculus?query=NDUrNS8oNyo4MisyLSgyMTgtMSkqMiktMTk=')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.error.should.be.equal(false)
                    res.body.result.should.be.a('number')
                    res.body.result.should.be.equal(26.035211267605632)
                    done()
                })
        })
        it('Calculation with blanks - should be a success', (done) => {
            chai.request(server)
                .get('/calculus?query=NDU2ICs3MjcgLyA3MiAqICgyKzItKDEyKjEpKS0y')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.error.should.be.equal(false)
                    res.body.result.should.be.a('number')
                    res.body.result.should.be.equal(373.22222222222223)
                    done()
                })
        })
        it('Calculation with negative result - should be a success', (done) => {
            chai.request(server)
                .get('/calculus?query=MiooMjMvKDMqMykpLTIzKigyKjMp')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.error.should.be.equal(false)
                    res.body.result.should.be.a('number')
                    res.body.result.should.be.equal(-132.88888888888889)
                    done()
                })
        })
    })

    // incorrect request or results.
    describe('Testing invalid expressions or calculations', () => {
        it('Empty request - should be a failure', (done) => {
            chai.request(server)
                .get('/calculus')
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.error.should.be.equal(true)
                    res.body.message.should.be.a('string')
                    res.body.message.should.include('Required query parameter')
                    done()
                })
        })
        it('Empty parameters - should be a failure', (done) => {
            chai.request(server)
                .get('/calculus?query=')
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.error.should.be.equal(true)
                    res.body.message.should.be.a('string')
                    res.body.message.should.include('Required query parameter')
                    done()
                })
        })
        it('Query contains letter - should be a failure', (done) => {
            chai.request(server)
                .get('/calculus?query=MSsxeCoz')// 1+1x*3
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.error.should.be.equal(true)
                    res.body.message.should.be.a('string')
                    res.body.message.should.include('+ - * / ( )')
                    done()
                })
        })
        it('Divide by zero - should be a failure', (done) => {
            chai.request(server)
                .get('/calculus?query=MS8w')
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.error.should.be.equal(true)
                    res.body.message.should.be.a('string')
                    res.body.message.should.include('infinity')
                    done()
                })
        })
        it('Result is infinity - should be a failure', (done) => {
            chai.request(server)
                .get('/calculus?query=MzE0MTU5MjY1MzU4OTc5MzIzODQ2MjY0MzM4MzI3OTUwMjg4NDE5NzE2OTM5OTM3NTEwNTgyMDk3NDk0NDU5MjMwNzgxNjQwNjI4NjIwODkqNDIyNTM1NDcyNjUzMDk4MTcxNTc4NDQ3ODM0MjE1ODIyMzI3MDIwNjkwMjg3MjMyMzMwMDUzODYyMTYzNDc5ODg1MDk0Njk1NDcyMDA0Nzk1MjMxMTIwMTUwNDMyOTMyMjY2MjgyNzI3NjMyMTc3OTA4ODQwMDg3ODYxNDgwMjIxNDc1Mzc2NTc4MTA1ODE5NzAyMjI2MzA5NzE3NDk1MDcyMTI3MjQ4NDc5NDc4MTY5NTcyOTYxNDIzNjU4NTk1NzgyMDkwODMwNzMzMjMzNTYwMzQ4NDY1MzE4NzMwMjkzMDI2NjU5NjQ1MDEzNzE4Mzc1NDI4ODk3NTU3OTcxNDQ5OTI0NjU0MDM4NjgxNzk5MjEzODkzNDY5MjQ0NzQxOTg1MDk3MzM0NjI2NzkzMzIxMDcyNi8oMTA2NjExODYzMDY3NDQyNzg2MjIwMzkxOTQ5LTMyMzIzMzQyMTA3MzAxNTQ1OTQwNTE2NTUzNzkwNjg2NjI3MzMzNzk5NTg1MTE1NjI1Nzg0MzIyOTg4MjczNzIzMTk4OTg3NTcxNDE1OTU3ODExMTk2MzU4MzMwMDU5NDA4NzMwNjgxMjE2MDI4NzY0OTYyODY3NDQ2MDQ3NzQ2NDkxNTk5NTA1NDk3Mzc0MjU2MjY5MDEwNDkwMzc3ODE5ODY4MzU5MzgxNDY1NzQxMjY4MDQ5MjU2NDg3OTg1NTYxNDUzNzIzNDc4NjczMzAzOTA0Njg4MzgzNDM2MzQ2Kjk2NDYxNTE1NzA5ODU4Mzg3NDEwNTk3ODg1OTU5NzcyOTc1NDk4OTMwMTYxNzUzOTI4NDY4MTM4MjY4NjgzODY4OTQyNzc0MTUpKzM0NTY3ODk0NTY3MzQ1Njc4MzU2NzgzLTgy')
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.error.should.be.equal(true)
                    res.body.message.should.be.a('string')
                    res.body.message.should.include('infinity')
                    done()
                })
        })
    })

})