const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    // const readStream = fs.createReadStream('./static/index.html');  //1
    // const readStream = fs.createReadStream('./static/example.json'); //2
    const readStream = fs.createReadStream('./static/sample.jpg');
    // res.writeHead(200, { 'Content-type': 'text/html' }); //1
    // res.writeHead(200, { 'Content-type': 'application/json' }); //2
    res.writeHead(200, { 'Content-type': 'image/jpg' });
    readStream.pipe(res);
  })
  .listen('3000');
