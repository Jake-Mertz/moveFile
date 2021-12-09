// const express = require("express")
// const cors = require("cors")
// const path = require('path');
// const index = require('index.js')

import express from 'express';
import cors from 'cors';
import path from 'path';
import filename from './index.js';

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async (req, res) => {
  res.send("Server is working!")
})

// ----vv----sendFile Routes----vv----//

// app.use('/sendFile', function (req, res, next) {
//   var options = {
//     root: path.join('./dir4')
//   };
//   // var fileName = 'bob.txt';
//   res.sendFile(filename, options, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log('Sent:', filename);
//       next();
//     }
//   });
// });

// app.get('/sendFile', function (req, res) {
//   console.log("File Sent")
//   res.send();
// });

app.post('http://localhost:5000/sendit', function(req, res){
    var options = {
      root: path.join('./dir3/' + filename)
    };

    // var fileName = 'Hello.txt';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});



// ----^^----sendFile Routes----^^----//

app.listen(port, () => {
  console.log(`Listening on port ${port}, welcome to the server side`)
})

export default app;
