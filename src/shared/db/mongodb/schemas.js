const mongoose = require('mongoose')

const AgentsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 80,
        validate(value) {
            if (value < 0) throw new Error("Negative rating aren't real.")
        }
    },
    fee: {
        type: Number,
        default: 6000,
        validate(value) {
            if (value < 0) throw new Error("Negative fee aren't real.")
        }
    },
    sales: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative sales aren't real.")
        }
    }
})

const RegionSchema = new mongoose.Schema({
    region: {
        type: String
    },
    address: {
        type: String,
        default: '4468 Wellington St Suite 204, Verdun, Quebec H4G 1W5'
    },
    total_sales: {
        type: Number,
        default: 0
    },
    manager: {
        type: Object
    },
    top_agents: [
        Object
    ]
})

const Agents = mongoose.model('Agents', AgentsSchema)
const Regions = mongoose.model('Regions', RegionSchema)

module.exports = {Agents, Regions}