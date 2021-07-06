const worker = require('workerpool')
const pool = worker.pool()

function calculation(mathQuery) {
    let result = eval(mathQuery)
    if (!Number.isFinite(result)) throw Error('The result is infinity or NaN.')

    return result
}

function decodeBase64(decodedString) {
    let encodedString = Buffer.from(decodedString, 'base64').toString('utf-8')

    // clear whitespaces
    encodedString = encodedString.split(" ").join("")

    return encodedString.split(" ").join("")
}


function sendError(res, err) {
    res.status(400).send({
        'error': true,
        'message': err
    })
}


module.exports = {
    makeCalculation: function (req, res) {
        let encodedMathQuery = req.query.query

        // checks if the parameter is defined and has a value.
        if (encodedMathQuery === undefined || encodedMathQuery.length === 0 || typeof encodedMathQuery !== 'string') return sendError(res, "Required query parameter in Request!")

        let decodedMathQuery = decodeBase64(encodedMathQuery)

        // checks if the query contains only of numbers and + - * / ( )
        if (!/^[0-9+-\/*()]*$/.test(decodedMathQuery)) return sendError(res, "The request does not meet the valid requirement. In addition to numbers, the following characters are allowed: + - * / ( )")

        // offload the calculation to a worker with a timeout of 4 sec
        pool.exec(calculation, [decodedMathQuery])
            .timeout(4000)
            .then(function (mathQueryResult) {
                res.status(200).send({
                    'error': false,
                    'result': mathQueryResult
                })
            })
            .catch(function (err) {
                sendError(res, err.toString())
            })
    }
}