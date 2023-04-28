const mongoose = require('mongoose');
const bicycleSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    rent_status: {
        type: Boolean,
        require: true
    }
})

const Bicycle = mongoose.model("bicycle", bicycleSchema);

module.exports = Bicycle;