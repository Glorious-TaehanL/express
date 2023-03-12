const fs = require('fs');
// const readStream = fs.createReadStream('./tutorial/example_3.txt', 'utf-8');
// const writeStream = fs.createWriteStream('./tutorial/example_4.txt');

// readStream.on('data', (chunk) => {
//   writeStream.write(chunk);
// });

fs.readFile('./tutorial/largefile.txt', (err, file) => {
  if (err) {
    console.log(err);
  } else {
    console.log(file);
  }
});
