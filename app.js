// Initial dependencies and definitions
require('dotenv').config()
const Express = require('express')
const app = Express()
const MongoManager = require('./src/shared/db/mongodb/mongo-manager')
const port = process.env.PORT || 3004

// Import routes
const HealthRoutes = require('./src/routes/health.routes')
const LastWeekAgentsRoutes = require('./src/routes/last_week_agents.routes')
const AgentsRoutes = require('./src/routes/agents.routes')
const RegionsRoutes = require('./src/routes/regions.routes')

app.use(Express.json())

HealthRoutes.registerHealthRoutes(app)
LastWeekAgentsRoutes.registerLastWeekAgentsRoutes(app)
AgentsRoutes.registerAgentsRoutes(app)
RegionsRoutes.registerRegionsRoutes(app)

MongoManager.openMongoConnection()

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
