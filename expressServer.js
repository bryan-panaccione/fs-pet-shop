
const express = require('express')
const fs = require('fs')
const app = express();

app.use(express.text())
app.use(express.json())


app.get('/:pets', (req, res) => {
    // Request//
    // access headers
    req.body = 'this is the home page'
    console.log(req.get('User-Agent'));
    //access body
    console.log(typeof req.body)
    //access method
    console.log(req.method)
    //access path
    console.log(req.path)
    //response
    //set headers
    //set body
    //set status code

    res.set('Content-Type', 'text/plain').status(201).send(req.body)
})
app.get('/pets/:petIndex', (req, res) => {
    const { petIndex } = req.params
    fs.readFile('pets.json', 'utf8', (err, data) => {
        const parsedData = JSON.parse(data);
        res.json(parsedData[petIndex])
    })

})

app.listen(3000)