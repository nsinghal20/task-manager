const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cors=require('cors');


// middleware
app.use(cors())  // to resolve cors
app.use(express.static('./public'));   // required to serve static files
app.use(express.json());    //he said without it cant use json data in routes

// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(
        `Server is listening on http://localhost:${port}/api/v1/tasks/...`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
