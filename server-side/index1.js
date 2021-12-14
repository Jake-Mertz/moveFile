import assert from 'assert'
import fse from 'fs-extra'
import mongodb from 'mongodb'
import dotenv from "dotenv";
dotenv.config();

// database uri, client connection, database name
const uri = process.env.SAMPLEFILES_DB_URI
const MongoClient = new mongodb.MongoClient(uri);
const dbName = 'sample_files'

// create values for names and destinations of files to be created
let number = 1;
let filename = 'bob' + number + '.txt'
let file = './dir1/' + filename

////////////////////////////////////
// Set execution time and date here
// months are 0 - 11
// time set in military format (ex 15:07 = 3:07pm) BUT see line 16
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
    // create a file so we have something to move
    fse.writeFile(file, `file number ${number}!`, (err) => {
      if (err) console.log(err);

      //////////////////////////////
      // database method
      MongoClient.connect((error) => {
        assert.ifError(error);
          const db = MongoClient.db(dbName);
          var bucket = new mongodb.GridFSBucket(db);
          // upload the file
          fse.createReadStream(file).
            pipe(bucket.openUploadStream(filename)).
            on('error', (error) => {
              assert.ifError(error);
            }).
            // download the file
            on('finish', function () {
              bucket.openDownloadStreamByName(filename).
                pipe(fse.createWriteStream(`./downloads/${filename}`)).
                on('error', (error) => {
                  assert.ifError(error);
                }).
                // update filename so we have a different name and destination for
                // the next file we create
                on('finish', () => {
                  number++;
                  filename = 'bob' + number + '.txt';
                  file = './dir1/' + filename;
                  console.log(number)
            });
          });
        });
        //////////////////////////////

      }
    );
  }, 3000);
  // change 3000 to 86400000 for function to execute once every 24 hours
  // 1000 = 1 second
}

// count length of time specified with startTime before function execution
const begin = setTimeout(() => {
  moveFunction();
}, startTime);
