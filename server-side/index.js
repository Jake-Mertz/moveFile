// const fs = require('fs-extra')

import fs from 'fs-extra';
import fetch from 'node-fetch';

let number = 1;
// assign values for names and destinations of files to be created
let filename = 'bob' + number + '.txt'
let file = './dir3/' + filename
// let file2 = './dir2/' + filename

////////////////////////////////////
// Set execution time and date here
// months are 0 - 11
// time set in military format (ex 15:07 = 3:07pm) BUT see line 15
// BUG(?): add 5 to hour for correct desired time
const year = 2021;
const month = 11;
const day = 7;
let time = '19:26';
const seconds = 0;
////////////////////////////////////

// Get hours and minutes from user input
const hours = Number(time.split(':')[0]);
const minutes = Number(time.split(':')[1]);

// assign user entered values for start time to new date object, and
// get current date
let date = new Date(year, month, day, hours, minutes, seconds);
let currentDate = new Date();

// get number of milliseconds elapsed since Jan 1 1970 for both user entered
// start time and current date, and find the difference
const dateGetTime = date.getTime();
const currentDateGetTime = currentDate.getTime();
const startTime = dateGetTime - currentDateGetTime;

// helpful info for the user
console.log("Start Time:", date);
console.log("Current Time:", currentDate);
console.log("Begin in", startTime / 1000, "seconds");

function moveFunction() {
  // function executes repeatedly at specified interval
  setInterval(() => {
    fs.writeFile(file, `file content${number}!`, (err) => {
      if (err) console.log(err);
    // move the file to an adjacent directory
    fetch('/sendFile')
      .then(res => res.send("File sent!"))
      .catch(err => console.error(err));


    // update filename so we have a different name and destination for
    // the next file we create
    number++;
    filename = 'bob' + number + '.txt';
    file = './dir3/' + filename;
    // file2 = './dir2/' + filename;
    // console.log(number)
    })
  }, 1000);
    // change 1000 to 86400000 for function to execute once every 24 hours
    // 1000 = 1 second
}

// count length of time specified with startTime before function execution
const begin = setTimeout(() => {
  moveFunction();
}, startTime);

export default { filename };
