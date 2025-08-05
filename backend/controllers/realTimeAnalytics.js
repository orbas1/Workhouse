const {
  getRealTimeAnalytics,
  getTrendAnalytics,
  getUserBehaviorAnalytics,
  getFinancialForecast,
  getSentimentAnalytics,
  createCustomAnalyticsReport,
  listCustomAnalyticsReports,
  getCustomAnalyticsReport,
  updateCustomAnalyticsReport,
  deleteCustomAnalyticsReport,
  getEngagementHeatmap,
  getContentPerformance,
  getApiUsageAnalytics,
  getEducationOutcomes,
} = require('../services/realTimeAnalytics');
const logger = require('../utils/logger');

async function handle(serviceFn, res, successStatus = 200) {
  try {
    const result = await serviceFn();
    return res.status(successStatus).json(result);
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({ error: err.message });
  }
}

const getRealTimeHandler = (req, res) =>
  handle(() => getRealTimeAnalytics(req.params.domain), res);

const getTrendsHandler = (req, res) =>
  handle(() => getTrendAnalytics(req.params.domain), res);

const getUserBehaviorHandler = (req, res) =>
  handle(() => getUserBehaviorAnalytics(req.params.userId), res);

const getFinancialForecastHandler = (req, res) =>
  handle(() => getFinancialForecast(), res);

const getSentimentHandler = (req, res) =>
  handle(() => getSentimentAnalytics(req.params.domain), res);

const createCustomReportHandler = (req, res) =>
  handle(() => createCustomAnalyticsReport(req.body), res, 201);

const listCustomReportsHandler = (req, res) =>
  handle(() => listCustomAnalyticsReports(), res);

const getCustomReportHandler = (req, res) =>
  handle(() => getCustomAnalyticsReport(req.params.reportId), res);

const updateCustomReportHandler = (req, res) =>
  handle(() => updateCustomAnalyticsReport(req.params.reportId, req.body), res);

const deleteCustomReportHandler = async (req, res) => {
  try {
    await deleteCustomAnalyticsReport(req.params.reportId);
    return res.status(204).send();
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({ error: err.message });
  }
};

const getEngagementHeatmapHandler = (req, res) =>
  handle(() => getEngagementHeatmap(req.params.domain), res);

const getContentPerformanceHandler = (req, res) =>
  handle(() => getContentPerformance(req.params.contentType), res);

const getApiUsageHandler = (req, res) =>
  handle(() => getApiUsageAnalytics(), res);

const getEducationOutcomesHandler = (req, res) =>
  handle(() => getEducationOutcomes(req.params.courseId), res);

module.exports = {
  getRealTimeHandler,
  getTrendsHandler,
  getUserBehaviorHandler,
  getFinancialForecastHandler,
  getSentimentHandler,
  createCustomReportHandler,
  listCustomReportsHandler,
  getCustomReportHandler,
  updateCustomReportHandler,
  deleteCustomReportHandler,
  getEngagementHeatmapHandler,
  getContentPerformanceHandler,
  getApiUsageHandler,
  getEducationOutcomesHandler,
};
