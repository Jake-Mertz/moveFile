import assert from 'assert'
import fse from 'fs-extra'
import mongodb from 'mongodb'
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.SAMPLEFILES_DB_URI

const MongoClient = new mongodb.MongoClient(uri);

const dbName = 'sample_files'

MongoClient.connect(function (error) {
  process.env.SAMPLEFILES_DB_URI,
  assert.ifError(error);

  const db = MongoClient.db(dbName);
  var bucket = new mongodb.GridFSBucket(db);

  fse.createReadStream('./bob.txt').
    pipe(bucket.openUploadStream('bob.txt')).
    on('error', function (error) {
      assert.ifError(error);
    }).
    on('finish', function () {
      console.log('done!');
      process.exit(0);
    });
});
