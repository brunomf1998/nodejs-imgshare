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

commentSchema.virtual('image')
    .set(function (image) {
        this._image = image
    })
    .get(function () {
        return this._image
    })

module.exports = model('Comment', commentSchema)