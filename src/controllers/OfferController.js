const Offer = require('../models/Offer')
module.exports = {
    async addOffer(request, response) {
        const { data } = request.body;

        try{
            await Offer.deleteMany({});
            const offer = await Offer.create(data)
            return response.json({ error: false, offer });
            
        } catch (error) {
            console.log(error)
            return response.json({ error: true, message: 'Erro ao criar a promoção' });
        }


    },
    async getOffer(request, response) {
        const offer = await Offer.find().sort({ register: 'asc' })
        return response.json({ error: false, offer });
    },

    async deleteOfferAll(request, response) {
        const offer = await Offer.deleteMany();
        return response.json({ error: false, offer });
    }
}