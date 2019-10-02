const mongoose = require('mongoose');
const consts = require("../config/consts");

const SpotSchema = new mongoose.Schema({
    thumbnail: {
        type: String
    },
    company: {
        type: String
    },
    value: {
        type: Number
    },
    technologies: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

}, {
    toJSON : {
        virtuals: true
    },
    timestamps: true
    });

// computed field to send to frontend with reference to image in backend
SpotSchema.virtual('thumbnail_url').get(function() {
    return `${consts.base_url}/files/${this.thumbnail}`
});


module.exports = mongoose.model('spots', SpotSchema);
