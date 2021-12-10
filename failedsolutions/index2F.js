const fs = require('fs-extra')

let number = 1;
const filename = `bob${number}.txt`
const file = `./dir1/${filename}`
const file2 = `./dir2/${filename}`

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    fs.writeFile(file, 'file content!', (err) => {
      if (err) console.log(err);
      }
    );
    fs.copy(file, file2,
      err => {
        if (err) return console.error(err)
      }
    );
  }, 3000);
});

const moveFile = () => {
  number++;
  myPromise
    .then( () => {if (number) {
      moveFile()
      }
    }
  );
}

moveFile()
