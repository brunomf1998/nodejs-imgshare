const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const commentSchema = new Schema({
    image_id: ObjectId,
    email: String,
    name: String,
    gravatar: String,
    comment: String,
    timestamp: { type: Date, default: Date.now }
})

module.exports = model('Comment', commentSchema)