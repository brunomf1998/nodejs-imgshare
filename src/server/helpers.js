const helpers = {}
const moment = require('moment')

helpers.timeAgo = (timestamp) => {
    moment.locale('es')
    return moment(timestamp).startOf('minute').fromNow()
}

module.exports = helpers