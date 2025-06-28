const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: {
    type: [String],
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && new Set(arr).size === arr.length
      },
      message: 'Duplicate values are not allowed.',
    },
  },
})

// bookSchema.set('toJSON', {
//   transform: (doc, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString()
//     delete returnedObj._id
//     delete returnedObj.__v
//   },
// })

module.exports = mongoose.model('Book', bookSchema)
