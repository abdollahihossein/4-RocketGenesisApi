const data = require('../../shared/resources/data')
const calcResidential = require('../../shared/resources/calculationResidential')
const agentModel = require('../../shared/db/mongodb/schemas')

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
        res.send(agent)
    } catch (error) {
        res.status(500).send(error)
    }
}

// agents
const agent = async(req, res) => {
    const sort = { last_name: 1 }
    const agents = await agentModel.find({}).collation({locale: "en" }).sort(sort)
    try {
        res.send(agents)
    } catch (error) {
        res.status(500).send(error)
    }
}

// 


module.exports = {email_list, region_avg, calc_residential, contact_us, agent_create, agent}