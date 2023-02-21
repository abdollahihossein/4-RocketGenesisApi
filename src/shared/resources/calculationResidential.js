const data = require('./data')

module.exports = function (numberOfApartments, numberOfFloors, tier, res) {
    if (!(isNaN(numberOfApartments)) && !(isNaN(numberOfFloors))) {
        if ((Number.isInteger(Number(numberOfApartments))) && (Number.isInteger(Number(numberOfFloors)))) {
            if ((numberOfApartments > 0) && (numberOfFloors > 0)) {
                if ((tier == 'standard') || (tier == 'premium') || (tier == 'excelium')) {
                    let numberOfBanks = Math.ceil(numberOfFloors/20)
                    let numberOfApartPerFloor = Math.ceil(numberOfApartments/numberOfFloors)
                    let numberOfElevators = numberOfBanks * Math.ceil(numberOfApartPerFloor/6)
                    if (tier == 'standard') {
                        unitPrice = data.unitPrices.standard
                        percentage = data.installPercentFees.standard
                    }
                    else if (tier == 'premium') {
                        unitPrice = data.unitPrices.premium
                        percentage = data.installPercentFees.premium
                    }
                    else if (tier == 'excelium') {
                        unitPrice = data.unitPrices.excelium
                        percentage = data.installPercentFees.excelium
                    }
                    let installationFee = percentage * numberOfElevators * unitPrice
                    let finalCost = installationFee + numberOfElevators * unitPrice
                    res.json({
                        number_of_elevators_required: `${numberOfElevators}`,
                        total_cost: `${finalCost}`
                    })
                }
                else res.send('Tier selection must be either standard or premium or excelium')
            }
            else res.send('Number of apartments and number of floors must be greater than zero')
        }
        else res.send('Number of apartments and number of floors must be integer')
    }
    else res.send('Number of apartments and number of floors must be number')
}