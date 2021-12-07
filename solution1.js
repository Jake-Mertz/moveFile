const fs = require('fs-extra')

let number = 1;
let filename = 'bob' + number + '.txt'
let file = './dir1/' + filename
let file2 = './dir2/' + filename

function moveFunction() {
  fs.writeFile(file, `file content${number}!`, (err) => {
    if (err) console.log(err);
    fs.copy(file, file2,
      err => {
        if (err) return console.error(err)
      }
    );
    number++;
    filename = 'bob' + number + '.txt';
    file = './dir1/' + filename;
    file2 = './dir2/' + filename;
    }
  );
}

const interval = setInterval(moveFunction, 1000);

// change 1000 to 86400000 for operation to occur once every 24 hours

moveFunction();
