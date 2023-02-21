const data = require('../../shared/resources/data')
const calcResidential = require('../../shared/resources/calculationResidential')

// hello
const helloWorld = async(req, res) => {
  res.send('Hello World!!')
}

// status
const status = async(req, res) => {
  res.send(`The Environment Name: ${process.env.ENV_NAME} - Port Number: ${process.env.PORT}`)
}

// error
const error = async(req, res) => {
  const error = new Error("Error Message")
  error.status = 404
  error.message = 'Not Found'
  res.status(error.status)
  res.send(`Something goes wrong! - Error code: ${error.status} - Error message: ${error.message}`)
}

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

module.exports = {helloWorld, status, error, email_list, region_avg, calc_residential, contact_us}