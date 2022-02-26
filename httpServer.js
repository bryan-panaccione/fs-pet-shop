const http = require('http');
const fs = require('fs')

const port = process.env.port || 8000

const regexPet = /^\/pets\/(\d)$/;
const regexAllPets = /^\/pets\/?$/;
const DATAPATH = './pets.json'

function errorHandler() {
    res.statusCode = 500
    res.statusMessage('Problem Reading JSON file...')
    res.end()
}



const server = http.createServer((req, res) => {

    if (req.method === 'GET' && regexPet.test(req.url)) {
        fs.readFile(DATAPATH, 'utf8', (err, data) => {
            if (err) errorHandler();
            res.setHeader('Content-Type', 'application/json');
            const index = req.url.match(regexPet)[1]
            const parsedData = JSON.parse(data)
            res.write(JSON.stringify(parsedData[index]))
            res.end()
        })
    }
    else if (req.method === 'GET' && regexAllPets.test(req.url)) {
        fs.readFile(DATAPATH, 'utf8', (err, data) => {
            if (err) errorHandler();
            res.setHeader('Content-Type', 'application/json');
            res.write(data)
            res.end()
        })
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain').end()
    }
})



server.listen(port, () => console.log(`Listening on port: ${port}`))