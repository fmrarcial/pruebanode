const os = require('node:os')

console.log('infrormation about the operating system')
console.log('==========')

console.log('nombre del sistema operativo: ',os.platform())
console.log('version de sistema operativo: ',os.release())
console.log('arquitectura del sistema operativo: ',os.arch())
console.log('0CPU: ',os.cpus())
console.log('memoria libre: ',os.freemem()/1023/1024/1024,'GB')
console.log('memoria total: ',os.totalmem()/1024/1024/1024,'GB')
console.log('tiempo de actividad: ',os.uptime()/60/60,'horas')
