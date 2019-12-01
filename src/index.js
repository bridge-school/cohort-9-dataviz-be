const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./api');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/error-handler');
const { FRONTEND_URL } = require('./constants');

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 8081;

logger.info('🤖 Initializing middleware');

// This piece of middleware creates the logs that you see when
// you hit an endpoint in your terminal. It's here to help you debug.
app.use(morgan('tiny', { stream: logger.stream }));
app.use(cors({ origin: FRONTEND_URL }));
app.use('/', router);
app.use(errorHandler);

// Serve the application at the given port
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = {
  app
};
