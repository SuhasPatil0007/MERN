function function1(){
    console.log('inside function1')
}

// function1()

function add(p1, p2) {
    const result = p1 + p2
    console.log(`result = ${result}`)
}

// add(10, 20)
// add(10, '20')

function subtract(p1, p2) {
    const result = p1 - p2
    console.log(`result = ${result}`)
}

// subtract(10, 20)

module.exports = {
    add,
    subtract,
}

