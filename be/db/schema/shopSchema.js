const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    shop_name: String,
    shop_address: String,
    shop_phone: String,
    shop_intro: String,
    shop_slogan: String,
    shop_start: String,
    shop_end: String,
    shop_ensure: Boolean,
    shop_bird: Boolean,
    shop_newshop: Boolean,
    shop_take: Boolean,
    shop_punctuality: Boolean,
    shop_invoice: Boolean,
    shop_num: Number,
    shop_amount: Number,
    shop_logo: String,
    shop_business_permits: String,
    shop_licence: String

})

module.exports = shopSchema