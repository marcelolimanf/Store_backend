const fs = require('fs');
const sharp = require('sharp')
const Configuration = require('../models/Configuration')


module.exports = {
    async list(request, response) {
        const configs = await Configuration.find()
        return response.json({ error: false, configs })
    },

    async edit(request, response) {

        const { 
            name,
            slogan,
            description,
            keyswords,
            showBanner,
            showTwoImages,
            title,
            embedCss,
            headerEmbed,
            footerEmbed,
            openingHours,
            phone,
            terms,
            privacy,
            refund,
            payment,
            showWhatsappChat = false,
            whatsappChatUsers,
            email, 
            address,
            instagram,
            facebook,
            youtube,
            whatsapp,
            socialNetworks
         } = request.body

        const hasConfig = await Configuration.findOne()


        var logo = ''
        var favicon = ''
        var image1 = ''
        var image2 = ''
        var banner1 = ''
        var banner2 = ''
        var banner3 = ''
        var banner4 = ''
        var banner5 = ''

        if(request.files['logo']) {
            await sharp(request.files['logo'][0].path).toFormat('png').toFile(`./public/logo.png`)
            logo = `/logo.png`
            await Configuration.updateOne({ logo })
        }
        if(request.files['favicon']) {
            await sharp(request.files['favicon'][0].path).toFormat('png').toFile(`./public/favicon.png`)
            favicon = `/favicon.png`
            await Configuration.updateOne({ favicon })
        }
        if(request.files['image1']) {
            await sharp(request.files['image1'][0].path).toFormat('png').toFile(`./public/image1.png`)
            image1 = `/image1.png`
            await Configuration.updateOne({ image1 })
        }
        if(request.files['image2']) {
            await sharp(request.files['image2'][0].path).toFormat('png').toFile(`./public/image2.png`)
            image2 = `/image2.png`
            await Configuration.updateOne({ image2 })
        }
        if(request.files['banner1']) {
            await sharp(request.files['banner1'][0].path).toFormat('png').toFile(`./public/banner1.png`)
            banner1 = `/banner1.png`
            await Configuration.updateOne({ banner1 })
        }
        if(request.files['banner2']) {
            await sharp(request.files['banner2'][0].path).toFormat('png').toFile(`./public/banner2.png`)
            banner2 = `/banner2.png`
            await Configuration.updateOne({ banner2 })
        }
        if(request.files['banner3']) {
            await sharp(request.files['banner3'][0].path).toFormat('png').toFile(`./public/banner3.png`)
            banner3 = `/banner3.png`
            await Configuration.updateOne({ banner3 })
        }
        if(request.files['banner4']) {
            await sharp(request.files['banner4'][0].path).toFormat('png').toFile(`./public/banner4.png`)
            banner4 = `/banner4.png`
            await Configuration.updateOne({ banner4 })
        }
        if(request.files['banner5']) {
            await sharp(request.files['banner5'][0].path).toFormat('png').toFile(`./public/banner5.png`)
            banner5 = `/banner5.png`
            await Configuration.updateOne({ banner5 })
        }

        if(hasConfig) {

            try {
                const config = await Configuration.updateOne({
                    name,
                    slogan,
                    description,
                    keyswords,
                    showBanner,
                    showTwoImages,
                    title,
                    embedCss,
                    headerEmbed,
                    footerEmbed,
                    openingHours,
                    phone,
                    terms,
                    privacy,
                    refund,
                    payment,
                    showWhatsappChat,
                    whatsappChatUsers: JSON.parse(whatsappChatUsers),
                    email,
                    address,
                    instagram,
                    facebook,
                    youtube,
                    whatsapp,
                    socialNetworks
                })


                return response.json({ error: false, config })
            } catch (error) {
                console.log(error)
                return response.json({ error: true, message: 'Erro ao criar a configuração' })
            }
        }else{
            try {
                const config = await Configuration.create({
                    name,
                    slogan,
                    description,
                    keyswords,
                    showBanner,
                    banner1,
                    banner2,
                    banner3,
                    banner4,
                    banner5,
                    showTwoImages,
                    image1,
                    image2,
                    title,
                    embedCss,
                    headerEmbed,
                    footerEmbed,
                    openingHours,
                    phone,
                    terms,
                    privacy,
                    refund,
                    payment,
                    showWhatsappChat,
                    whatsappChatUsers: whatsappChatUsers ? JSON.parse(whatsappChatUsers) : [{ number: "", name: "", role: "", start: "", end: "" }],
                    email,
                    address,
                    instagram,
                    facebook,
                    youtube,
                    whatsapp,
                    socialNetworks
                })

                return response.json({ error: false, config })
            } catch (error) {
                console.log(error)
                return response.json({ error: true, message: 'Erro ao criar a configuração' })
            }
        }
    },

    async deleteImage(request, response) {
        const { image } = request.body
        
        try {
            var haveFile = fs.existsSync(`./public/${image}.png`)
            if(haveFile) {
                fs.unlinkSync(`./public/${image}.png`)
            }
            if(image == 'banner1') {
                await Configuration.updateOne({ banner1: '' })
            }else if (image == 'banner2') {
                await Configuration.updateOne({ banner2: '' })
            }
            else if (image == 'banner3') {
                await Configuration.updateOne({ banner3: '' })
            }
            else if (image == 'banner4') {
                await Configuration.updateOne({ banner4: '' })
            }
            else if (image == 'banner5') {
                await Configuration.updateOne({ banner5: '' })
            }
            else if (image == 'image1') {
                await Configuration.updateOne({ image1: '' })
            }
            else if (image == 'image2') {
                await Configuration.updateOne({ image2: '' })
            }
    
            return response.status(200).json({ error: false, message: 'Imagem deletada com sucesso' })
            
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: true, message: 'Erro ao deletar a imagem' })
        }

    }

}