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
            const dataParsed = JSON.parse(data)
            if (err) throw err;
            const newPet = { age, kind, name }
            dataParsed.push(newPet)
            const readyToAdd = JSON.stringify(dataParsed)
            fs.writeFile('./pets.json', readyToAdd, (err2, data2) => {
                if (err2) throw err2;
            })
        })
        break;
    case 'destroy':
        console.log('destroying file')
        const index2 = Number.parseInt(process.argv[3])
        if (Number.isNaN(index2)){
            console.log(`Usage: node pets.js destroy INDEX`)
            process.exit(1);
        } 
        fs.readFile('./pets.json', 'utf-8', (err,data)=>{
            console.log('ova here')
            if(err) throw err;
            const parseData = JSON.parse(data);
            parseData.splice(index2, 1)
            fs.writeFile('./pets.json', JSON.stringify(parseData), (err2, data2) =>{
                if(err2) throw err2;
                console.log(parseData)
            })

        })
        break;
    case 'update':
        console.log('updating file')
        const upName = process.argv[6]
        const upType = process.argv[5]
        const upAge = Number.parseInt(process.argv[4])
        const upIndex = Number.parseInt(process.argv[3])
        if (Number.isNaN(upAge) || Number.isNaN(upIndex) || !upType || !upName){
            console.error(`Usage: node pets.js update INDEX AGE TYPE NAME`)
            process.exit(1)
        }
        fs.readFile('./pets.json', 'utf-8', (err,data) =>{
            const parsedData = JSON.parse(data);
            const upPet = {upAge, upType, upName}
            parsedData[upIndex] = upPet
            fs.writeFile('./pets.json', JSON.stringify(parsedData), (err2, data2) =>{
                if(err2) throw err2;
            })
        })
        break;
    default:
        console.log(process.argv)
        console.error('Usage: node pets.js [read | create | update | destroy]')
        process.exit(1)
}

//server.listen(PORT)
//console.log(`Listening on Port ${PORT}`)
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