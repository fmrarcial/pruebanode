const http = require('node:http')
const dittojson = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader(
                        'Content-Type',
                        'application/json; charset=utf-8'
                    )
                    return res.end(JSON.stringify(dittojson))

                default:
                    res.statusCode = 404
                    res.setHeader(
                        'Content-Type',
                        'text/html; charset=utf-8'
                    )
                    return res.end(
                        '<h1>404 Not Found</h1><p>La página que buscas no existe.</p>'
                    )
            }

        case 'POST':
            switch (url) {
                case '/pokemon':
                    let body = ''

                    req.on('data', (chunk) => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)

                        res.statusCode = 201
                        res.setHeader(
                            'Content-Type',
                            'application/json; charset=utf-8'
                        )

                        res.end(JSON.stringify(data))
                    })

                    break

                default:
                    res.statusCode = 404
                    res.setHeader(
                        'Content-Type',
                        'text/html; charset=utf-8'
                    )
                    return res.end(
                        '<h1>404 Not Found</h1><p>La ruta no existe.</p>'
                    )
            }
            break

        default:
            res.statusCode = 405
            res.setHeader(
                'Content-Type',
                'text/html; charset=utf-8'
            )
            return res.end('<h1>405 Method Not Allowed</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('Server listening on port http://localhost:1234')
})