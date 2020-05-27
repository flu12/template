const mongoose = require('mongoose');

const init = (app, cb) => {
  const {
    ENV,
    DATABASE,
  } = app.get('config');

  // Logging queries in the console
  // mongoose.set('debug', true);

  // Connect to MongoDB
  console.log('Connecting to DB:');
  console.log(DATABASE);
  // mongoose.set('debug', ENV === 'development');
  mongoose
    .connect(
      DATABASE,
      {
        useCreateIndex: true,
        useNewUrlParser: true,

      }
    )
    .then(async () => {
      console.log('***** MongoDB Connected *****');

      cb(null);
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);

      return cb(err);
    });
};

module.exports = {
  init,
};
