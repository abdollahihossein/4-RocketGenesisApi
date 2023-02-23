const AgentsController = require('../features/agents/agents.controller')

const registerAgentsRoutes = (app) => {
    app.get('/email-list', AgentsController.email_list)
    app.get('/region-avg', AgentsController.region_avg)
    app.get('/calc-residential', AgentsController.calc_residential)
    app.post('/contact-us', AgentsController.contact_us)
    app.post('/agent-create', AgentsController.agent_create)
    app.get('/agents', AgentsController.agent)
    app.get('/agents-by-region', AgentsController.agents_by_region)
    app.patch('/agent-update-info/:id', AgentsController.agent_update_info)
    app.delete('/agent-delete', AgentsController.agent_delete)
}

module.exports = {registerAgentsRoutes}