const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Product = new Schema({
    productId: {
        type: String,
    },

    name: {
        type: String,
    },

    normalPrice: {
        type: Number,
    },

    promoPrice: {
        type: Number,
    },

    wholesalePrice: {
        type: Number,
        default: 0
    },

    wholesaleMinQuantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },

    category: {
        type: String,
    },

    thumb: {
        type: String,
    },

    images: {
        type: Array,
    },
    offer1: {
        type: Boolean,
        default: false
    },

    offer2: {
        type: Boolean,
        default: false
    },

    offer3: {
        type: Boolean,
        default: false
    },
    highlight: {
        type: Boolean,
        default: false
    },

    variations : {
        type: Array,
    },
    categories: {
        type: Array,
    },
    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', Product)
