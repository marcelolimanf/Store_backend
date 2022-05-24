require('dotenv').config();
const mongoose = require('mongoose')

const URI = process.env.MONGO_DB_URI;

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


mongoose
  .connect(URI, options)
  .then(() => console.log('DB is Up!'))
  .catch((err) => console.log(err));