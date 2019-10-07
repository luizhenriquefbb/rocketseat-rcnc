const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date : String,
    approved : {
        type: Boolean,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spots'
    }


}, { timestamps: true });

module.exports = mongoose.model('booking', BookingSchema);
