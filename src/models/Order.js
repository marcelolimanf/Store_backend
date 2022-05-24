const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const Order = new Schema({
    clientName: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    clientPhone: {
        type: String,
        required: [true, 'Telefone é obrigatório']
    },    
    clientCpf: {
        type: String,
        required: [true, 'CPF é obrigatório']
    },
    shippingMethod: {
        type: String,
    },
    shippingAddress: {
        type: Object,
    },
    shippingPrice: {
        type: Number,
    },
    shippingType: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    products: {
        type: Array,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        enun: ['Pending', 'Paid', 'Canceled', 'Delivered'],
        default: 'Pending'
    },
    txId: {
        type: String,
    },
    qrCode:{
        type: String,
    },
    qrCodeImage: {
        type: String,
    },
    register: {
        type: Date,
        default: Date.now
    }
})

Order.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', Order)
