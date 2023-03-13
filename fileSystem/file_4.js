const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();
// const readStream = fs.createReadStream('./tutorial/example_3.txt', 'utf-8');
const readStream = fs.createReadStream('./tutorial/example_4.txt.gz');
// const writeStream = fs.createWriteStream('./tutorial/example_4.txt');
const writeStream = fs.createWriteStream('./tutorial/uncompressed.txt');

// readStream.on('data', (chunk) => {
//   writeStream.write(chunk, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Successfully created file');
//     }
//   });
// });

// readStream.pipe(gzip).pipe(writeStream);
readStream.pipe(gunzip).pipe(writeStream);
