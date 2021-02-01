const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        requred: true,
        trim: true
    },
    lastName: {
        type: String,
        requred: true,
        trim: true
    },
    email: {
        type: String,
        requred: true,
        trim: true,
        uniqu: true
    },
    password: {
        type: String,
        requred: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('User', UsersSchema);