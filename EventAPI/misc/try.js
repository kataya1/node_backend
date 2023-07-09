

console.log(1);
setTimeout(console.log, 0, 6)
setImmediate(() => console.log(7));
setTimeout(console.log, 0, 8)
process.nextTick(() => console.log('2'));
new Promise((resolve) => {
    console.log(1.2)
    resolve('4');
}).then((data) => {
    console.log('3')
    console.log(data);
    process.nextTick(() => console.log('5'));
});
console.log(1.5)


// output
// 1
// 1.2
// 1.5
// 3
// 4
// 2
// 5
// 7
// 6
// 8