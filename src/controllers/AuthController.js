const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 86400,
    })
}

module.exports = {
    async login(request, response) {
        const { email, password } = request.body

        if (!email || !password)
            return response.status(400).json({ error: "Preencha todos os campos" })

        try {
            const user = await User.findOne({ email })

            if (!user)
                throw new Error("Email ou senha incorretos")

            if (!await bcrypt.compare(password, user.password))
                throw new Error('Email ou senha incorretos')

            return response.status(200).json({ error: false, token: generateToken({ id: user._id, email: user.email }) })

        } catch (error) {
            return response.status(400).json({ error: true, message: error.message });
        }
    },
    async register(request, response) {
        const { email, password } = request.body

        if (!email || !password)
            return response.status(400).json({ error: "Preencha todos os campos." })

        try {
            const user = await User.findOne({ email })

            if (user)
                throw new Error("Usuário já cadastrado")

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                email,
                password: passwordHash,
            })

            return response.status(200).json({ error: false, token: generateToken({ id: newUser._id, email: newUser.email }) })

        } catch (error) {
            return response.status(400).json({ error: true, message: error.message });
        }
    },

    async getUser(request, response) {
        const { id } = request


        let user  = await User.findOne({ _id: id })

        if (!user)
            return response.status(400).json({ error: true, message: "Usuário não encontrado" })

        user.password = undefined

        return response.status(200).json({ error: false, user })
    }
}