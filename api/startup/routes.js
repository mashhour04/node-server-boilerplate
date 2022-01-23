const staticFile = require('connect-static-file');
const favicon = require('serve-favicon');
const path = require('path');
const express = require('express');

const ErrorHandler = require('../middlewares/errorHandlerMiddleware');
const BucketHandler = require('../middlewares/bucketMiddlware');
const User = require('../components/User');
const Upload = require('../components/uploader');

module.exports = async app => {
  app.use('/uploads', express.static(path.resolve('./uploads')));
  app.get('/sw.js', express.static(path.join(__dirname, '../../public/sw.js')));

  app.use('/api/users', User.Router);
  app.use('/api/upload', Upload.Router);
  app.use('/api/media', BucketHandler);
  app.use(favicon(path.resolve('./public/favicon.ico')));
  app.use('/sw.js', staticFile(path.resolve('./public/sw.js')));

  app.use(ErrorHandler.catch404Errors);
  app.use(ErrorHandler.handleUnexpectedErrors);
};
