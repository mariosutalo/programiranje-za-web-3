import http from "http"
import lodash from "lodash"
const { random } = lodash

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('Hi from node.js')
    // res.write(':)')
    const randomNumber = random(1, 100)
    res.setHeader('Content-Type', 'text/html')
    res.write('<h5>Hi, this is heading</h5>')
    res.write(`<p>Generated random number is: ${randomNumber}</p>`)
    res.end()
})

server.listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000')
})
