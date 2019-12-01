const express = require('express');

const { healthRouter } = require('../routes/health/health.router');
const { cohortsRouter } = require('../routes/cohorts/cohorts.router');
const { defaultRouter } = require('../routes/defaultRoute/defaultRoute.router');

const router = express.Router();
router.use('/health', healthRouter);
router.use('/cohorts', cohortsRouter);
router.use('*', defaultRouter);

module.exports = router;
