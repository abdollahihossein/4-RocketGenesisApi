const HealthController = require('../features/health/health.controller')
const Logger = require('../features/middleware/logger')

const registerHealthRoutes = (app) => {
  app.get('/hello', Logger.logger, HealthController.helloWorld)
  app.get('/status', Logger.logger, HealthController.status)
  app.get('/error', Logger.logger, HealthController.error)
}

module.exports = {registerHealthRoutes}