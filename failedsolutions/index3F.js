const fs = require('fs-extra')

let number = 1;
let filename = 'bob' + number + '.txt'
// let filename = 'bob' + `${number}.txt`
// let filename = `bob${number}.txt`
let file = './dir1/' + filename
// let file = './dir1/' + `${filename}`
// let file = `./dir1/${filename}`
let file2 = './dir2/' + filename
// let file2 = './dir2/' + `${filename}`
// let file2 = `./dir2/${filename}`

// function File(filePath) {
//   this.filename = `bob${number}.txt`
//   this.file = `./dir1/${filename}`
//   this.file2 = `./dir2/${filename}`
// }

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
    console.log(number)
    console.log(filename)
    console.log(file)
    console.log(file2)
    }
  );
}

const interval = setInterval(moveFunction, 1000);

moveFunction();
