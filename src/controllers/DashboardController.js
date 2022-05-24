const Order = require('../models/Order');
const Product = require('../models/Product');
const Client = require('../models/Client');

module.exports = {
    async info(req, res) {
        const orders = await Order.find({})
        const productsCount = await Product.countDocuments({})
        const totalOrdersValue = orders.reduce((total, order) => total + order.total, 0)

        return res.json({
            orders_count: orders.length,
            products_count: productsCount,
            total_orders_value: totalOrdersValue
        })


    }
}