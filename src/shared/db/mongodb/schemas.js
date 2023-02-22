const mongoose = require('mongoose')

const AgentsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    region: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    rating: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative rating aren't real.")
        }
    },
    fee: {
        type: Number,
        default: 0,
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

const Agents = mongoose.model('Agents', AgentsSchema)

module.exports = Agents