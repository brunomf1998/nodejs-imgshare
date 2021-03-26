const path = require('path')
const { randomName } = require('../helpers/libs')
const fs = require('fs-extra')
const ctrl = {}
const { Image, Comment } = require('../models/index')
const md5 = require('md5')

ctrl.index = async (req, res) => {
    const image = await Image.findOne({ uniqueId: req.params.image_id }).lean()
    console.log(image)
    res.render('image', { image })
}

ctrl.create = (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomName()
        const images = await Image.find({ filename: imgUrl })
        if (images.length > 0) {
            saveImage()
        } else {
            const imageTempPath = req.file.path
            const ext = path.extname(req.file.originalname).toLowerCase()
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.move(imageTempPath, targetPath)
                const newImg = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imgUrl + ext
                });
                newImg.uniqueId = newImg.filename.replace(path.extname(newImg.filename), '');
                const imageSaved = await newImg.save()
                res.redirect('/images/' + imageSaved.uniqueId)
            } else {
                await fs.remove(imageTempPath)
                res.status(500).json({
                    error: 'Only images are allowed'
                })
            }
        }
    }
    saveImage()
}

ctrl.like = (req, res) => {
    
}

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({ uniqueId: req.params.image_id })
    if (image) {
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        console.log(newComment)
        res.send('Comment')
    }
}

ctrl.remove = (req, res) => {
    
}

module.exports = ctrl