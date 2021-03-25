const path = require('path')
const { randomName } = require('../helpers/libs')
const fs = require('fs-extra')
const ctrl = {}
const { Image } = require('../models/index')

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

ctrl.comment = (req, res) => {
    
}

ctrl.remove = (req, res) => {
    
}

module.exports = ctrl