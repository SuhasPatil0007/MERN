// import the os module
const os = require('node:os')

console.log(`operating system: ${os.platform()}`)
console.log(`cpu architecture: ${os.arch()}`)
console.log(`#cpus: `, os.cpus().length)
console.log(`total memory: ${os.totalmem() / (1024 * 1024 * 1024)}GB`)
console.log(`available memory: ${os.freemem() / (1024 * 1024 * 1024)}GB`)
console.log(`hostname: ${os.hostname()}`)
console.log(`home directory: ${os.homedir()}`)
