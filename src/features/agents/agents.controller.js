const agentModel = require('../../shared/db/mongodb/schemas')

// agent-create
const agent_create = async(req, res) => {
    const agent = new agentModel(req.body)
    try {
        await agent.save()
        res.send('An agent was created successfully!')
    } catch (error) {
        res.status(500).send(error)
    }
}

// agents
const agent = async(req, res) => {
    const sort1 = { last_name: 1 }
    const agents = await agentModel.find({})
        .collation({locale: "en" })
        .sort(sort1)
    try {
        res.send(agents)
    } catch (error) {
        res.status(500).send(error)
    }
}

// agents-by-region
const agents_by_region = async(req, res) => {
    let query1 = {"region": req.query.region}
    const sort2 = { rating: -1 }
    const agentsByRegion = await agentModel.find(query1)
        .collation({locale: "en" })
        .sort(sort2)
    try {
        res.send(agentsByRegion)
    } catch (error) {
        res.status(500).send(error)
    }
}

// agent-update-info
const agent_update_info = async(req, res) => {
    let allowedFields = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "region": req.body.region
    }
    try {
        const updatedAgent = await agentModel.findByIdAndUpdate(req.params.id, allowedFields, {
            new: true,
        })
        res.send(updatedAgent)
    } catch (error) {
        res.status(500).send('Agent does not already exist!')
    }
}

// agent-delete
const agent_delete = async(req, res) => {
    let query2 = req.query
    try {
        let count = await agentModel.countDocuments(query2)
        if (count == 1) {
            await agentModel.deleteOne(query2)
            res.send('item deleted!')
        }
        if (count > 1) {
            res.status(400).send('Multiple records exist!')
        }
        if (count == 0) {
            res.status(404).send('No item found!')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {agent_create, agent, agents_by_region, agent_update_info, agent_delete}
