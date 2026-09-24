const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('Bienvenido a mi primer servidor')
    } else if (req.url === '/image.png') {
        fs.readFile('imagenn.PNG', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('Error al leer la imakkgen')
                return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'image/png')
            res.end(data)
        })
    } else if (req.url === '/about') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(
            '<h1>Acerca de</h1><p>Este es un servidor HTTP básico en Node.js</p>'
        )
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(
            '<h1>404 Not Found</h1><p>La página que buscas no existe.</p>'
        )
    }
})

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})