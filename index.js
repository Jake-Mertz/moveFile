const fs = require('fs-extra')

let number = 1;

const moveFile = () => {

  const filename = `bob${number}.txt`
  const file = `./dir1/${filename}`
  const file2 = `./dir2/${filename}`
  console.log("top of method!")

  for (let i = 0; i >= 0; i++) {
    console.log("top of loop!")
    fs.writeFile(file, 'file content!', (err) => {
      if (err) console.log(err);
    }
  )

  setTimeout(() => {
    fs.copy(file, file2,
      err => {
        if (err) return console.error(err)
        console.log('timeOut!')
      }
    )
  }, 2000)

    console.log("end of method!")
    number++;
  }
}

moveFile()
