const express = require("express");
const recipients = require('./routes/recipients');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes

app.use('/api/v1/recipients', recipients);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();