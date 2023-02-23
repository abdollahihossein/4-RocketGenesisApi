const data = require('../../shared/resources/data')
const calcResidential = require('../../shared/resources/calculationResidential')
const agentModel = require('../../shared/db/mongodb/schemas')
const { count } = require('../../shared/db/mongodb/schemas')

// email-list
const email_list = async(req, res) => {
    let emaillist = []
    let j = 0
    data.agents.forEach(element => {
      emaillist[j] = element.email
      j++
    })
    res.send(JSON.stringify(emaillist))
}

// region-avg
const region_avg = async(req, res) => {
  let region = req.query.region
  let sumRating = 0
  let sumFee = 0
  let j = 0
  data.agents.forEach(element => {
    if (element.region == region) {
      sumRating += parseInt(element.rating)
      sumFee += parseInt(element.fee)
      j++
    }
  })
  if (j == 0) {
    res.send(`No agents found in region ${region}`)
  }
  else {
    let avgRating = sumRating/j
    let avgFee = sumFee/j
    res.json({
      region: `${region}`,
      average_rating: `${avgRating.toFixed(2)}`,
      average_fee: `${avgFee.toFixed(2)}`})
  }
}

// calc-residential
const calc_residential = async(req, res) => {
  let numberOfApartments = req.query.numberOfApartments
  let numberOfFloors = req.query.numberOfFloors
  let tier = req.query.tier
  calcResidential(numberOfApartments, numberOfFloors, tier, res)
}

// contact-us
const contact_us = async(req, res) => {
  console.log(req.body)
  res.send(`A message was received from ${req.body.first_name} ${req.body.last_name}`)
}

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

module.exports = {email_list, region_avg, calc_residential, contact_us, agent_create, agent, agents_by_region, agent_update_info, agent_delete}
