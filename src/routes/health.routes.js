const HealthController = require('../features/health/health.controller')

const registerHealthRoutes = (app) => {
  app.get('/hello', HealthController.helloWorld)
  app.get('/status', HealthController.status)
  app.get('/error', HealthController.error)
  app.get('/email-list', HealthController.email_list)
  app.get('/region-avg', HealthController.region_avg)
  app.get('/calc-residential', HealthController.calc_residential)
  app.post('/contact-us', HealthController.contact_us)
}

module.exports = {registerHealthRoutes}