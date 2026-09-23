const fs=require('node:fs/promises')

console.log('informacion del archivo')
fs.readFile('./archivo.txt','utf-8')
.then(text=>{
    console.log("primer texto", text)
})

console.log('mientras se lee el archivo')

console.log('informacion del segundo archivo')
fs.readFile('./archivo2.txt','utf-8')
.then(text=>{
    console.log("segundo texto", text)
})