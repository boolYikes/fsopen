const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

module.exports = mongoose.model('Genre', genreSchema)
