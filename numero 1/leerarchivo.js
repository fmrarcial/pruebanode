const fs=require('node:fs')

console.log('informacion del archivo')
 fs.readFile('./archivo.txt','utf-8',(err,text)=>{
   
console.log(pritext)})

console.log('mientras se lee el archivo')

console.log('informacion del segundo archivo')
 fs.readFile('./archivo2.txt','utf-8',(err,text)=>{
    console.log("segundo texto", text)
})


