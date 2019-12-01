const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res
    .status(err.statusCode)
    .send(
      'There was a problem retrieving the data. The following error has accured:' +
        err.message
    );
};

module.exports = {
  errorHandler
};
