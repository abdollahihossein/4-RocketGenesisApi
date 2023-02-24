const RegionsController = require('../features/regions/regions.controller')
const Authentication = require('../features/middleware/authentication')
const Logger = require('../features/middleware/logger')

const registerRegionsRoutes = (app) => {
    app.post('/region-create', Logger.logger , Authentication.isAuth , RegionsController.region_create)
    app.get('/region', Logger.logger , Authentication.isAuth , RegionsController.regions)
    app.get('/all-stars', Logger.logger , Authentication.isAuth , RegionsController.all_stars)
}

module.exports = {registerRegionsRoutes}