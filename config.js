require('dotenv').config();

module.exports = {
    isProducction: process.env.NODE_ENV != 'dev',
    mongobd: process.env.MONGOBD_CNN,
    port: process.env.PORT,
  };
