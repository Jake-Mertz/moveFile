// File creation and movement occur on set interval
// beginning at specified date & time

const fs = require('fs-extra')

let number = 1;
let filename = 'bob' + number + '.txt'
let file = './dir1/' + filename
let file2 = './dir2/' + filename

////////////////////////////////////
// Set execution time and date here
// months are 0 - 11
// time set in military format (ex 15:07 = 3:07pm) BUT see line 15
// add 5 to hour for correct desired time
const year = 2021;
const month = 11;
const day = 7;
let time = '18:51';
const seconds = 50;
////////////////////////////////////

const hours = Number(time.split(':')[0]);
const minutes = Number(time.split(':')[1]);
let date = new Date(year, month, day, hours, minutes, seconds);

let currentDate = new Date();

const dateGetTime = date.getTime() / 1000;
const currentDateGetTime = currentDate.getTime() / 1000;
const startTime = dateGetTime - currentDateGetTime;

console.log(date);
console.log(currentDate);
console.log(startTime);

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
    console.log(number);
    }
  );
}


const begin = setTimeout(() => {
  setInterval(moveFunction, 1000);
}, startTime);

// change 1000 to 86400000 for function to execute once every 24 hours
// 1000 = 1 second
