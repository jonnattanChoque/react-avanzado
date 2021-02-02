const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        requred: true,
        trim: true
    },
    stock: {
        type: Number,
        requred: true
    },
    price: {
        type: Number,
        requred: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Product', ProductsSchema);