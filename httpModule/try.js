process.stdout.write(`hello whywinrsit `);
process.stdout.write(`hello whywinrsit\n`);
// console.log('world! \f')
for (let i = 0; i < 5; i++) {
    console.log(`Progress: ${i}\r`); // Overwrites previous line
}