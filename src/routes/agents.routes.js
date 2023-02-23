const AgentsController = require('../features/agents/agents.controller')
const Authentication = require('../features/middleware/authentication')
const Logger = require('../features/middleware/logger')

const registerAgentsRoutes = (app) => {
    app.post('/agent-create', Logger.logger , Authentication.isAuth , AgentsController.agent_create)
    app.get('/agents', Logger.logger , Authentication.isAuth , AgentsController.agent)
    app.get('/agents-by-region', Logger.logger , Authentication.isAuth , AgentsController.agents_by_region)
    app.patch('/agent-update-info/:id', Logger.logger , Authentication.isAuth , AgentsController.agent_update_info)
    app.delete('/agent-delete', Logger.logger , Authentication.isAuth , AgentsController.agent_delete)
}

module.exports = {registerAgentsRoutes}