const { Image } = require('../models');

module.exports = {
    popular: async () => {
        const images = await Image.find()
            .limit(6)
            .sort({ likes: -1 });
        return images;
    }
}