const { getFrete } = require("../util");

module.exports = {
    async get (request, response) {
        const { cepOrigem, cep, peso, comprimento, altura, largura, diametro } = request.body;

        if(!cepOrigem || !cep || !peso || !comprimento || !altura || !largura || !diametro)
        return response.status(400).json({ error: true, message: "Preencha todos os campos" });

        try {
            const frete = await getFrete(cepOrigem, cep, peso, comprimento, altura, largura, diametro);
            return response.status(200).json({ error: false, frete });
            
        } catch (error) {
            return response.status(400).json({ error: true, error });     
        }
    }
}