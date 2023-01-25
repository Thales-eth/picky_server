const mongoose = require('mongoose')

const isValid = (id) => {
    return mongoose.isValidObjectId(id)
}

module.exports = { isValid }