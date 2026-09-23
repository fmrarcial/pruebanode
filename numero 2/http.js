const http =require('node:http')


const desiredPort = process.env.PORT ?? 1234 
const server=http.createServer((req,res)=>{

    if (req.url==='/'){
    res.statusCode=200
    res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end('bienvendido a mi primér servidor')
} 
else if (req.url==='/about'){
    res.statusCode=200
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end('<h1>Acerca de</h1><p>Este es un servidor HTTP básico en Node.js</p>')
}
else{
    res.statusCode=404
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end('<h1>404 Not Found</h1><p>La página que buscas no existe.</p>')   

    
}
})


    server.listen(desiredPort, () => {
        console.log(`server listening on port http://localhost:${desiredPort}`)
    })