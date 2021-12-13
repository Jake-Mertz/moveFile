import express from 'express';
import cors from 'cors';
import path from 'path';
// import filename from './index.js';

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async (req, res) => {
  res.send("Server is working!")
})

// ----vv----sendFile Routes----vv----//





// ----^^----sendFile Routes----^^----//

app.listen(port, () => {
  console.log(`Listening on port ${port}, welcome to the server side`)
})

export default app;
