Reading a file:
```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

Writing a file:
```js
fs.writeFile('file.txt', 'Some data!', err => {
  if (err) throw err;
  console.log('File written!'); 
});
```

Appending to a file:
```js
fs.appendFile('file.txt', 'Some more data!', err => {
  if (err) throw err;
  console.log('Data appended!'); 
});
```

Reading a file stream:
```js 
const readStream = fs.createReadStream('file.txt');
readStream.on('data', chunk => {
  console.log(chunk.toString()); 
});
``` 

Writing a file stream: 
```js
const writeStream = fs.createWriteStream('file.txt');
writeStream.write('Hello');
writeStream.write('World!');
writeStream.end();
```

Watching for file changes:
```js
fs.watch('file.txt', (eventType, filename) => {
  console.log(filename + ' ' + eventType); 
}); 
```

Deleting a file:
```js
fs.unlink('file.txt', err => {
  if (err) throw err; 
  console.log('File deleted!');
});
```

