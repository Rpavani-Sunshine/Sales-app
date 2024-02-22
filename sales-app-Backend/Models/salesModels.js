const MONGODB = require('mongoose')

const salesSchema = new MONGODB.Schema({
    Product_Name:{
        type: String,
        required: true,
    },
    Quantity:{
        type: Number,
        required: true,
    },
    Amount:{
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: new Date
    }
});

// Create Document in MongoDB
MONGODB.model('SalesDataModel', salesSchema)