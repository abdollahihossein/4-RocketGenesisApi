const LastWeekAgentsController = require('../features/last-week-agents/last_week_agents.controller')
const Authentication = require('../features/middleware/authentication')
const Logger = require('../features/middleware/logger')

const registerLastWeekAgentsRoutes = (app) => {
    app.get('/email-list', Logger.logger , Authentication.isAuth , LastWeekAgentsController.email_list)
    app.get('/region-avg', Logger.logger , Authentication.isAuth , LastWeekAgentsController.region_avg)
    app.get('/calc-residential', Logger.logger , Authentication.isAuth , LastWeekAgentsController.calc_residential)
    app.post('/contact-us', Logger.logger , Authentication.isAuth , LastWeekAgentsController.contact_us)
}

module.exports = {registerLastWeekAgentsRoutes}