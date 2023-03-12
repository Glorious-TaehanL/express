const fs = require('fs');
/*
fs.mkdir('tutorial', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully create folder');
    fs.writeFile('./tutorial/example.txt', '123', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully create example txt');
      }
    });
    /*
    fs.rmdir('tutorial', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully deleted that created foleder');
      }
    });
    
  }
});
*/
fs.readdir('tutorial', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
    for (let file of files) {
      fs.unlink('./tutorial/' + file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully deleted file');
        }
      });
    }
  }
});
