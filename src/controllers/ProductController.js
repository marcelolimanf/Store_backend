const sharp = require('sharp')
const fs = require('fs')

const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')


module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query
        const products = await Product.find().sort({ 'register' : 'desc'})
        return response.json({ error: false, products })
    },

    async listMostSold(request, response) {
        const orders = await Order.find({})
    },

    async createProductThumb(request, response) {
        const { id } = request.query
        
        try {
            var haveProduct = await Product.findOne({ productId: id })

            if(!haveProduct) {
                await Product.create({
                    thumb: `/products/${id}/thumb.png`,
                    productId: id
                })
            }

            const existPath = fs.existsSync(`./public/products/${id}`)
    
            if(!existPath) {
                fs.mkdirSync(`./public/products/${id}`, { recursive: true })
    
                await sharp(request.file.path).toFormat('png').toFile(`./public/products/${id}/thumb.png`)
            }else{
                await sharp(request.file.path).toFormat('png').toFile(`./public/products/${id}/thumb.png`)
            }



    
            return response.json({ error: false, message: 'Imagem de principal adicionada com sucesso' })
            
        } catch (error) {
            return response.json({ error: true, message: 'Erro ao adicionar a imagem de principal' })
        }

    },

    async createProductImages(request, response) {
        const { id } = request.query
        
        try {
            const existPath = fs.existsSync(`./public/products/${id}`)

            if (!existPath) {
                fs.mkdirSync(`./public/products/${id}`, { recursive: true })
            }

            request.files.forEach(async (file, i) => {
                setTimeout(async () => {
                    await sharp(file.path).toFormat('png').toFile(`./public/products/${id}/${i+1}.png`)
                }, i+300)
            })
            await Product.findOneAndUpdate({ productId: id }, { $set: { images: request.files.map((file, i) => `/products/${id}/${i+1}.png`) } })
            return response.json({ error: false, message: 'Imagens adicionadas com sucesso' })
        } catch (error) {
            console.log(error)
            return response.json({ error: true, message: 'Erro ao adicionar as imagens' })
        }
    },

    async createProductInfo (request, response) {
        const { id, name, normalPrice, promoPrice, description, wholesalePrice, wholesaleMinQuantity, category, offer1 = false, offer2 = false, offer3 = false, highlight, variations } = request.body  
        
        try {
            const product = await Product.findOneAndUpdate({ productId: id }, { $set: { name, normalPrice, promoPrice, description, wholesalePrice, wholesaleMinQuantity, offer1, offer2, offer3, highlight, category, variations }})
            return response.json({ error: false, product })
            
        } catch (error) {
            return response.json({ error: true, message: error.message })
        }
    },

    async searchByName(request, response) {
        const { name } = request.query
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }).sort({ 'register' : 'desc'})
        return response.json({ error: false, products })
    },

    async deleteProduct(request, response) {
        const { id } = request.query

        try {
            const product = await Product.findOneAndDelete({ productId: id })
            if(product) {
                return response.json({ error: false, message: 'Produto deletado com sucesso' })
            }else{
                return response.json({ error: true, message: 'Produto não encontrado' })
            }
            
        } catch (error) {
            return response.json({ error: true, message: error.message })
        }
    },

    async deleteAll(request, response) {
        try {
            await Product.deleteMany()
            return response.json({ error: false, message: 'Produtos deletados com sucesso' })
        } catch (error) {
            return response.json({ error: true, message: error.message })
        }
    }
    
}