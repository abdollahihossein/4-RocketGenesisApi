const AgentsController = require('../features/agents/agents.controller')

// Authentication
function isAuth(req, res, next) {
    const auth = req.headers.authorization
    if (auth == process.env.AUTH_TOKEN) {
      next()
    } else {
      res.status(401)
      res.send('Access Forbidden')
    }
}

const registerAgentsRoutes = (app) => {
    app.get('/email-list', isAuth , AgentsController.email_list)
    app.get('/region-avg', isAuth , AgentsController.region_avg)
    app.get('/calc-residential', isAuth , AgentsController.calc_residential)
    app.post('/contact-us', isAuth , AgentsController.contact_us)
    app.post('/agent-create', isAuth , AgentsController.agent_create)
    app.get('/agents', isAuth , AgentsController.agent)
    app.get('/agents-by-region', isAuth , AgentsController.agents_by_region)
    app.patch('/agent-update-info/:id', isAuth , AgentsController.agent_update_info)
    app.delete('/agent-delete', isAuth , AgentsController.agent_delete)
}

module.exports = {registerAgentsRoutes}