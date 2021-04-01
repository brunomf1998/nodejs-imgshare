const { Comment, Image } = require('../models')

imagesCounter = async () => {
    return await Image.countDocuments()
}

commentsCounter = async () => {
    return await Comment.countDocuments()
}

imageTotalViewsCounter = async () => {
    const result = await Image.aggregate([{ 
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }])
    return result[0].viewsTotal
}

likesTotalCounter = async () => {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }])
    return result[0].likesTotal
}

module.exports = async () => {
    const results = await Promise.all([
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}