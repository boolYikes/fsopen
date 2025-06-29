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
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
})

// bookSchema.set('toJSON', {
//   transform: (doc, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString()
//     delete returnedObj._id
//     delete returnedObj.__v
//   },
// })

module.exports = mongoose.model('Book', bookSchema)
