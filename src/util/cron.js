const moment = require('moment')
moment.locale('pt-br')

const { getPayment } = require('../services/gerencianet')
const Order = require('../models/Order')

const interval = setInterval(async () => {
    const orders = await Order.find({
        register: {
            $gte: moment().utc(-3).subtract(2, 'days').format(), 
            $lt: moment().utc(-3).add(2, 'days').format()
        },
        status: 'Pending'
    })
    for(const order of orders) {
        if(order.txId) {
            const payment = await getPayment(order.txId)
            if(payment.status === 'CONCLUIDA') {
                Order.updateOne({ _id: order._id }, { status: 'Paid' })
            }
        }
    }
}, 1000*10)

module.exports = interval