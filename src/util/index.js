const fs = require('fs');
var CryptoJS = require("crypto-js");
const { calcularPrecoPrazo } = require('correios-brasil');



function encrypt(text) {
    return CryptoJS.AES.encrypt(text, process.env.ENCRYPT_KEY).toString();
}


function decrypt(text) {
    var bytes  = CryptoJS.AES.decrypt(text, process.env.ENCRYPT_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}


const getFrete = async (cepOrigem, cep, peso, comprimento, altura, largura, diametro) => {
    return new Promise((resolve, reject) => {
        if(largura < 10) {
            return reject({ error: "A largura não pode ser menor que 10cm" });
        }
        if(comprimento < 15) {
            return reject({ error: "O comprimento não pode ser menor que 15cm" });
        }
        
        let args = {
            sCepOrigem: cepOrigem,
            sCepDestino: cep,
            nVlPeso: peso,
            nCdFormato: '1',
            nVlComprimento: comprimento,
            nVlAltura: altura,
            nVlLargura: largura,
            nCdServico: ['04014', '04510', '40290'],
            nVlDiametro: '15',
        }
         
        calcularPrecoPrazo(args)
        .then(result => {
            var new_result = result
            new_result.forEach(data => {
                switch (data.Codigo) {
                    case '04014':
                        data.NomeServico = 'SEDEX'
                        break;
                    case '04510':
                        data.NomeServico = 'PAC'
                        break;
                    case '40290':
                        data.NomeServico = 'SEDEX 10'
                        break;
                    default:
                        break;
                }
            })
            resolve(new_result);
        })
        .catch(error => {
          reject(error);
        });
    });
}

function subtotal(array) {
    var subtotal = 0

    for(const data of array) {
        subtotal += parseFloat(data.product.normalPrice) * parseInt(data.quantity)
        
    }

    return parseFloat(subtotal).toFixed(2)
}

function total(array) {
    var total = 0
    array.forEach(data => {
        if(data.product.wholesalePrice) {
            if(data.product.wholesaleMinQuantity){
                if(data.quantity >= data.product.wholesaleMinQuantity) {
                    total += parseFloat(data.product.wholesalePrice) * parseInt(data.quantity)
                }else if(data.product.promoPrice != null) {
                    total += parseFloat(data.product.promoPrice) * parseInt(data.quantity)
                }else{
                    total += parseFloat(data.product.normalPrice) * parseInt(data.quantity)
                }
            }else if(data.product.promoPrice != null) {
                total += parseFloat(data.product.promoPrice) * parseInt(data.quantity)
            }else{
                total += parseFloat(data.product.normalPrice) * parseInt(data.quantity)
            }
        }else if(data.product.promoPrice != null) {
            total += parseFloat(data.product.promoPrice) * parseInt(data.quantity)
        }else{
            total += parseFloat(data.product.normalPrice) * parseInt(data.quantity)
        }
    })
    return parseFloat(total).toFixed(2)

}

function discount(array) {
    var discount = 0
    discount = parseFloat(subtotal(array)) - parseFloat(total(array))

    return parseFloat(discount).toFixed(2)
}



module.exports = {
    getFrete,
    discount,
    subtotal,
    total,
    encrypt,
    decrypt

}