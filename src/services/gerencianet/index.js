require('dotenv').config()
var axios = require("axios")
const { v4: uuidv4 } = require('uuid')
const moment = require('moment-timezone')
moment.locale('pt-br')

const https = require("https");
var fs = require("fs");
const path = require("path");

var certificado = fs.readFileSync(path.join(__dirname, "cert-homo.p12"));

var credenciais = {
  client_id: process.env.GERENCIANET_CLIENT_ID,
  client_secret: process.env.GERENCIANET_CLIENT_SECRET,
};

var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

var auth = Buffer.from(data_credentials).toString("base64");

const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});

var config = {
  method: "POST",
  url: `${process.env.GERENCIANET_BASE_URL}/oauth/token`,
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
};

const createPayment = (clientName, clientCpf, paymentValue) =>{
  return new Promise(async (resolve, reject) => {
    try {
      const get_token = await axios(config).then(r => r.data)
      const token = `Bearer ${get_token.access_token}`

      var data = {
        "calendario": {
          "expiracao": 60*60*24*2,
        },
        "devedor": {
          "cpf": clientCpf,
          "nome": clientName
        },
        "valor": {
          "original": paymentValue
        },
        "chave": process.env.GERENCIANET_KEY,
        "solicitacaoPagador": "Na Fonte dos chinelos"
      }

      var txId = uuidv4().split('-').join('')

      var requestConfig = {
        method: "PUT",
        url: `${process.env.GERENCIANET_BASE_URL}/v2/cob/${txId}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        httpsAgent: config.httpsAgent,
        data: data
      }

      const payment = await axios(requestConfig).then(r => r.data)

      const locId = payment.loc.id

      const genQrCode = {
        method: "GET",
        url: `${process.env.GERENCIANET_BASE_URL}/v2/loc/${locId}/qrcode`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        httpsAgent: config.httpsAgent,
      }

      const qrcode = await axios(genQrCode).then(qrcode => qrcode.data)

      return resolve({
        qrcode: qrcode,
        payment: payment
      })
    } catch (error) {
      return reject(error)
    }
  })
}

const listPayments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const get_token = await axios(config).then(r => r.data)
      const token = `Bearer ${get_token.access_token}`

      const data = {
        method: "GET",
        url: `${process.env.GERENCIANET_BASE_URL}/v2/cob?inicio=${moment().utc(-3).subtract(2, 'days').format()}&fim=${moment().utc(-3).add(2, 'days').format()}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        httpsAgent: config.httpsAgent,
      }

      const payments = await axios(data).then(payments => payments.data)
      return resolve(payments)

    } catch (error) {
      return reject(error)
    }
  })
}

const getPayment = (txId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const get_token = await axios(config).then(r => r.data)
      const token = `Bearer ${get_token.access_token}`

      const data = {
        method: "GET",
        url: `${process.env.GERENCIANET_BASE_URL}/v2/cob/${txId}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        httpsAgent: config.httpsAgent,
      }

      const payments = await axios(data).then(payments => payments.data)
      return resolve(payments)

    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = { createPayment, listPayments, getPayment }