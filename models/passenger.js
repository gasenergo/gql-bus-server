const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    name: String,
    phone: String,
    seatNum: Number,
    busId: String
});

module.exports = mongoose.model('Passenger', passengerSchema);
