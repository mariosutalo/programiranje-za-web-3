import http from "http"

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('Hi from node.js')
    // res.write(':)')
    res.setHeader('Content-Type', 'text/html')
    res.write('<h2>Hi, this is heading</h2>')
    res.end()
})

server.listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000')
})
