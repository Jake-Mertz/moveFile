// File creation and movement occur on set interval
// beginning at execution of file

const fs = require('fs-extra')

let number = 1;
// assign values for names and destinations of files to be created
let filename = 'bob' + number + '.txt'
let file = './dir1/' + filename
let file2 = './dir2/' + filename

function moveFunction() {
  // create a file so we have something to move
  fs.writeFile(file, `file content${number}!`, (err) => {
    if (err) console.log(err);
  // move the file to an adjacent directory
    fs.copy(file, file2,
      err => {
        if (err) return console.error(err)
      }
    );
  // update filename so we have a different name and destination for
  // the next file we create
    number++;
    filename = 'bob' + number + '.txt';
    file = './dir1/' + filename;
    file2 = './dir2/' + filename;
    // console.log(number)
    }
  );
}

// function executes repeatedly at specified interval
const interval = setInterval(moveFunction, 1000);

// change 1000 to 86400000 for function to execute once every 24 hours
// 1000 = 1 second
