const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const Offer = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    initDate: {
        type: String,
    },
    expireDate: {
        type: String,
    },
    register: {
        type: Date,
        default: Date.now
    }
})

Offer.plugin(mongoosePaginate);

module.exports = mongoose.model('Offer', Offer)
