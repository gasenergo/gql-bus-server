const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
    date: String,
    time: String,
    route: String,
    description: String,
    vehicle: String
});

module.exports = mongoose.model('Bus', busSchema);

