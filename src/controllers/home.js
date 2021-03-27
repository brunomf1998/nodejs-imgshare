const ctrl = {};
const { Image } = require('../models/index')

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({ timestamp: -1 })
    /* let viewModel = { images: [] };
    viewModel.images = images;
    console.log(viewModel) */
    res.render('index', { images })
}

module.exports = ctrl