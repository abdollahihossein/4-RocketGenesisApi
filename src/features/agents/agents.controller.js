const Model = require('../../shared/db/mongodb/schemas')

// agent-create
const agent_create = async(req, res) => {
    try {
        await Model.Agents.create(req.body)
        res.send('An agent was created successfully!')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// agents
const agent = async(req, res) => {
    const agents = await Model.Agents.find({})
        .collation({locale: "en"})
        .sort({last_name: 1})
    let count = await Model.Agents.countDocuments({})
    try {
        if (count == 0) {
            res.status(404).send('No item found!')
        }
        else {
            res.send(agents)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// agents-by-region
const agents_by_region = async(req, res) => {
    let query = {"region": req.query.region}
    const agentsByRegion = await Model.Agents.find(query)
        .collation({locale: "en"})
        .sort({rating: -1})
    let count = await Model.Agents.countDocuments(query)
    try {
        if (count == 0) {
            res.status(404).send('No item found!')
        }
        else {
            res.send(agentsByRegion)
        }
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
        const updatedAgent = await Model.Agents.findByIdAndUpdate(req.params.id, allowedFields, {
            new: true,
        })
        res.send(updatedAgent)
    } catch (error) {
        res.status(500).send('Agent does not already exist!')
    }
}

// agent-delete
const agent_delete = async(req, res) => {
    let query = req.query
    try {
        let count = await Model.Agents.countDocuments(query)
        if (count == 1) {
            await Model.Agents.deleteOne(query)
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
