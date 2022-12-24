let runner = new Promise((resolve, reject) => {
    let chain = Promise.resolve()
    chain = chain.then(() => fn1())
    chain = chain.then(() => fn2())
    chain = chain.then(() => {
        resolve('isok')
    })
})

function fn1() {
    setTimeout(() => {
        console.log('fn1')
    }, 1000)
    
}


function fn2() {
    setTimeout(() => {
        console.log('fn2')
    }, 500)
}
runner.then((res) => {
    console.log('runner....', res)
})
console.log('end')