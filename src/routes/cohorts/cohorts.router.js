const express = require('express');

const { cohortsController } = require('./cohorts.controller');

const { singleCohortController } = require('./singleCohort.controller');
const router = express.Router();

router.get('', cohortsController);
router.get('/:id', singleCohortController);

module.exports = {
  cohortsRouter: router
};
