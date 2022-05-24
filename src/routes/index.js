const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')
const upload = require('../middlewares/Multer')

const AuthController = require('../controllers/AuthController')
const FreightController = require('../controllers/FreightController')
const ProductController = require('../controllers/ProductController')
const ConfigurationController = require('../controllers/ConfigurationController')
const OrderController = require('../controllers/OrderController')
const ClientController = require('../controllers/ClientController')
const DashboardController = require('../controllers/DashboardController')
const OfferController = require('../controllers/OfferController')

const config_filds = [
    {
        name: 'logo', 
        maxCount: 1
    },
    {   
        name: 'favicon', 
        maxCount: 1 
    }, 
    {
        name: 'banner1',
        maxCount: 1
    }, 
    {
        name: 'banner2',
        maxCount: 1
    }, 
    {
        name: 'banner3',
        maxCount: 1
    }, 
    {
        name: 'banner4',
        maxCount: 1
    }, 
    {
        name: 'banner5',
        maxCount: 1
    },
    {
        name: 'image1',
        maxCount: 1
    }, 
    {
        name: 'image2',
        maxCount: 1
    }

]

//Auth Controller
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.get('/user/info', Auth, AuthController.getUser)

//Product controller
router.get('/products', ProductController.list)
router.get('/products/search', ProductController.searchByName)
router.post('/products/create/createProductThumb', Auth, upload.single('thumb'), ProductController.createProductThumb)
router.post('/products/create/createProductImages', Auth, upload.array('images'), ProductController.createProductImages)
router.post('/products/create/createProductInfo', Auth, ProductController.createProductInfo)
router.delete('/products/deleteAll', Auth, ProductController.deleteAll)
router.delete('/products/deleteOne', Auth, ProductController.deleteProduct)

//Freight Controller
router.post('/freight/get_price', FreightController.get)

//Configuration Controller
router.get('/configuration', ConfigurationController.list)
router.post('/configuration', Auth, upload.fields(config_filds), ConfigurationController.edit)
router.post('/configuration/delete-image', Auth, ConfigurationController.deleteImage)

//Order Controller
router.get('/orders/list', Auth, OrderController.list)
router.get('/order/search', Auth, OrderController.searchOrder)
router.get('/order/info', Auth, OrderController.info)
router.get('/order/details', OrderController.orderDetails)
router.post('/order/new', OrderController.create)
router.put('/order/update', Auth, OrderController.update)
router.delete('/order/delete', Auth, OrderController.delete)

//Client Controller
router.get('/clients/list', Auth, ClientController.list)
router.get('/client/search', Auth, ClientController.seachClient)
router.delete('/client/delete', Auth, ClientController.delete)

//Dashboard Controller
router.get('/dashboard', Auth, DashboardController.info)


//Offer Controller
router.get('/offers/list', OfferController.getOffer)
router.post('/offers/create', Auth, OfferController.addOffer)
router.delete('/offers/deleteAll', Auth, OfferController.deleteOfferAll)




module.exports = router