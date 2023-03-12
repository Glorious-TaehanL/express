const fs = require('fs');
/* First test (Comment out the other test section) */
fs.writeFile('example.txt', 'this is example..', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File success created!!');
    fs.readFile('example.txt', 'utf-8', (err, file) => {
      if (err) {
        console.log(err);
      } else {
        console.log(file);
        // when readFile('example.txt',(err,file)=>{});
        //<Buffer 74 68 69 73 20 69 73 20 65 78 61 6d 70 6c 65 2e 2e>
      }
    });
  }
});

/* Second test (Comment out the other test section) */
fs.rename('example.txt', 'example2.txt', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully rename file');
  }
});
/* Third test (Comment out the other test section) */
fs.appendFile(
  'example2.txt',
  'This line is append by appendfile function',
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully append file');
    }
  }
);
/* Fourth test (Comment out the other test section) */
fs.unlink('example2.txt', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully deleted file');
  }
});
