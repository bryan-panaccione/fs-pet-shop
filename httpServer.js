const PORT = 8080;
const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.headers, "headers")
    console.log(req.method, "method")
    console.log(req.url, "url")
    console.log(req.headers, "headers")

    console.log(new URL(req.url, `http://${req.headers.host}`))


    // let data = '';
    // req.on('data', (chunk) => {
    //     data += chunk
    // });
    // req.on('end', () => {
    //     console.log('ended');
    //     console.log(data);
    // })
    if (req.url === '/time') {
        res.write(JSON.stringify({ now: new Date() }))
    } else {
        res.write(`invalid listen location bro`)
    }
    res.writeHead(200, { "Content-Type": "application/json" })


    res.end();
})

server.listen(PORT)
console.log(`Listening on Port ${PORT}`)