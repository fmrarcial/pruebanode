const {readFile}= require('node:fs/promises')

    async function init(){
    console.log('informacion del archivo')
    const text = await readFile('./archivo.txt','utf-8')
    console.log("primer texto", text)

    console.log('mientras se lee el archivo')  
    console.log('informacion del segundo archivo')
    const text2 = await readFile('./archivo2.txt','utf-8')
   console.log("segundo texto", text2)

}
init()
