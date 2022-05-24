const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const Client = new Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    cpf: {
        type: String,
    },
    totalSpent: {
        type: Number,
        default: 0,
    },
    lastPurchaseDate: {
        type: Date,
    },
    register: {
        type: Date,
        default: Date.now
    }
})

Client.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', Client)
