const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        unique: true,
    },
    
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
    },

    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)
