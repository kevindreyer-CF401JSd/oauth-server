// 3rd party resources
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const authRouter = require('./routes/authRouter');
app.use(authRouter);

// Error catching
const notFound = require('./middleware/notFound');
app.use(notFound);
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

//Export 
module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}.`);
    })
  }
}