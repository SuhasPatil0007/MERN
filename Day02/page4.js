// import the fs module
const fs = require('node:fs')

function function1() {
  // synchronous function / API
  // blocking function / API
  // sequential code
  try {
    console.log(`reading file started...`)
    // if a function ends with Sync, the function is a synchronous function
    const data = fs.readFileSync('./file1.txt')
    console.log(`reading file finished...`)
    console.log(`data: ${data}`)
  } catch (ex) {
    console.log(`exception: `, ex)
  }

  console.log(`equation processing started...`)
  const result = 2342432424234234 * 2424234242424244 * 22342432324
  console.log(`equation processing finished...`)
  console.log(`result = ${result}`)
}

// function1()

console.log('----------------------------------------')

function function2() {
  // asynchronous function
  // non-blocking function
  // non-sequential execution
  console.log(`reading file started`)

  // the second parameter of every async function in nodeJS is a callback function
  // since the readFile is async function, it gets executed in a new thread
  fs.readFile('./file1.txt', (error, data) => {
    if (error) {
      console.log(`error: ${error}`)
    } else {
      console.log('reading file finished')
      console.log(`data = ${data}`)
    }
  })

  console.log(`equation processing started...`)
  const result = 2342432424234234 * 2424234242424244 * 22342432324
  console.log(`equation processing finished...`)
  console.log(`result = ${result}`)
}

function2()
