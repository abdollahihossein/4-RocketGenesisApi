const Model = require('../../shared/db/mongodb/schemas')

// region-create
const region_create = async(req, res) => {
    let count = await Model.Regions.countDocuments({})
    if (count == 4) {
        res.status(400).send('Region already exists!')
    }
    else {
        let myList = ["North", "East", "South", "West"]
        for (let myRegion of myList) {
            let query1 = {"region": myRegion}
            let query2 = {"region": myRegion.toLowerCase()}
            try {
                await Model.Regions.create(query1)
                let agentsByRegion = await Model.Agents.find(query2)
                let sortedAgents = agentsByRegion.sort(function(a, b){return b.sales - a.sales})
                let newAgent = {
                    first_name: `${myRegion} Manager`,
                    last_name: 'Agent',
                    email: `${myRegion.toLowerCase()}-manager@example.com`,
                    region: myRegion.toLowerCase(),
                    sales: 0
                }
                let sum = 0
                agentsByRegion.forEach(element => {
                    sum += element.sales
                })
                let query3 = {
                    "total_sales": sum,
                    "manager": newAgent,
                    "top_agents": sortedAgents.slice(0,3)
                }
                await Model.Regions.findOneAndUpdate(query1, query3)
            } catch (error) {
                res.status(500).send(error)
            }
        }
        res.send('4 regions created: North, East, South, West!')
    }
}

// region
const regions = async(req, res) => {
    let query = {"region": req.query.region}
    const region = await Model.Regions.find(query)
    let count = await Model.Regions.countDocuments(query)
    try {
        if (count == 0) {
            res.status(404).send('No item found in this region!')
        }
        else {
            res.send(region[0])
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// all-stars
const all_stars = async(req, res) => {
    let myList = ["North", "East", "South", "West"]
    let result = []
    let j = 0
    for (let myRegion of myList) {
        let query = {"region": myRegion}
        const region = await Model.Regions.find(query)
        try {
            result[j] = {
                info: `Top agent in region ${myRegion} is ${region[0].top_agents[0].first_name} ${region[0].top_agents[0].last_name} with sales of $${region[0].top_agents[0].sales}`,
                details: region[0].top_agents[0]
            }
            j++
        } catch (error) {
            res.status(500).send(error)
        }
    }
    res.send(result)
}

module.exports = {region_create, regions, all_stars}







