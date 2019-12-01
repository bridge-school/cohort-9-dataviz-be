const express = require('express');

const { defaultRouteController } = require('./defaultRoute.contoller');

const router = express.Router();

router.get('', defaultRouteController);

module.exports = {
  defaultRouter: router
};
