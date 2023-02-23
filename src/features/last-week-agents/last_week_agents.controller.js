const data = require('../../shared/resources/data')
const Calculations = require('../../shared/resources/calculations')

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
    Calculations.calcResidential(numberOfApartments, numberOfFloors, tier, res)
}

// contact-us
const contact_us = async(req, res) => {
    console.log(req.body)
    res.send(`A message was received from ${req.body.first_name} ${req.body.last_name}`)
}

module.exports ={email_list, region_avg, calc_residential, contact_us}