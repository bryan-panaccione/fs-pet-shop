const fs = require('fs')


const subcommand = process.argv[2]

switch (subcommand) {
    case 'read':
        const index = process.argv[3]
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const parsedData = JSON.parse(data)
            if (err) {
                throw err;
            }
            if (!index) {
                console.log(parsedData)
            } else if (parsedData[index]) {
                console.log(parsedData[index])
            } else {
                console.error(`Pet at index ${index} does not exist`)
            }
        })
        break;
    case 'create':
        const kind = process.argv[4]
        const age = Number.parseInt(process.argv[3])
        const name = process.argv[5]
        if (Number.isNaN(age) || !kind || !name) {
            console.error(`Usage: node pets.js create AGE KIND NAME`)
            process.exit(1)
        }
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            const originalDataParsed = JSON.parse(data)
            if (err) throw err;
            const newPet = { age, kind, name }
            originalDataParsed.push(newPet)
            console.log(originalDataParsed)
            const readyToAdd = JSON.stringify(originalDataParsed)
            fs.writeFile('./pets.json', readyToAdd, (err2, data2) => {
                if (err2) throw err2;
                console.log(originalDataParsed)
            })
        })
        break;
    case 'destroy':
        console.log('destroying file')
        break;
    case 'update':
        console.log('updating file')
        break;
    default:
        console.error('Usage: node pets.js [read | create | update | destroy]')
        process.exit(1)
}

// protocol: http

// HTTP request
    //version
    //headers
    //body

    //path
    //method

// HTTP response
    // version
    //headers
    //body

    //statuscode