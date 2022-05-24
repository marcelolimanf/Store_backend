const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { bool } = require('sharp');

const Schema = mongoose.Schema;

const Client = new Schema({
    name: {
        type: String,
    },
    expire: {
        type: Boolean
    },
    expireIn: {
        type: Date
    },
    register: {
        type: Date,
        default: Date.now
    }
})

Client.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', Client)
