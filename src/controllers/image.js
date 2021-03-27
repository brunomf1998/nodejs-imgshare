const path = require('path')
const { randomName } = require('../helpers/libs')
const fs = require('fs-extra')
const ctrl = {}
const { Image, Comment } = require('../models/index')
const md5 = require('md5')

ctrl.index = async (req, res) => {
    try {
        const viewModel = { image: {}, comments: {} }
        const image = await Image.findById(req.params.image_id)
        image.views = image.views + 1
        viewModel.image = image
        await image.save()
        const comments = await Comment.find({ image_id: image._id })
        viewModel.comments = comments
        res.render('image', viewModel)
    } catch (error) {
        res.redirect('/')
    }
}

ctrl.create = async (req, res) => {
    const imageTempPath = req.file.path
    const ext = path.extname(req.file.originalname).toLowerCase()
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        const newImg = new Image({
            title: req.body.title,
            description: req.body.description,
            ext: ext
        });
        const targetPath = path.resolve(`src/public/upload/${newImg._id}${ext}`)
        await fs.move(imageTempPath, targetPath)
        const imageSaved = await newImg.save()
        res.redirect('/images/' + imageSaved._id)
    } else {
        await fs.remove(imageTempPath)
        res.status(500).json({
            error: 'Only images are allowed'
        })
    }
}

ctrl.like = async (req, res) => {
    try {
        const image = await Image.findById(req.params.image_id)
        image.likes = image.likes + 1
        await image.save()
        res.json({
            likes: image.likes
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Error'
        })
    }
}

ctrl.comment = async (req, res) => {
    const image = await Image.findById(req.params.image_id)
    if (image) {
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        console.log(newComment)
        await newComment.save()
        res.redirect('/images/' + image._id)
    }
}

ctrl.remove = (req, res) => {
    
}

module.exports = ctrl