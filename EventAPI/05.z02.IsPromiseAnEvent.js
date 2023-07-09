// In Promises, `resolve` is not technically an event. A Promise is resolved when its executor function calls the `resolve` function. This triggers the Promise to enter a fulfilled state, and causes any `then()` callbacks attached to the Promise to be invoked asynchronously.

// So while Promise resolution acts similarly to an emitted event that triggers callback functions, it is more correct to think of it as simply transitioning the Promise into a fulfilled state. 

let p = new Promise((res, rej) => setTimeout(res, 1000, 'resolved event'))

p.on('resolve', (data) => {
    console.log(data, "resolved")
})
p.on('fulfilled', (data) => {
    console.log(data, "fulfilled")
})

//code doesn't work throws erro