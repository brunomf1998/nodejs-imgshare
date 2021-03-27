const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
    title: String,
    description: String,
    ext: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema)