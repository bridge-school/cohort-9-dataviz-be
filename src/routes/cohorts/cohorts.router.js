const express = require('express');

const { cohortsController } = require("./cohorts.controller");

const router = express.Router();

router.get("", cohortsController);

module.exports = {
  cohortsRouter: router
}
