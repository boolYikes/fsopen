const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  born: {
    type: Number,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

// authorSchema.set('toJSON', {
//   transform: (doc, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString()
//     delete returnedObj._id
//     delete returnedObj.__v
//   },
// })

module.exports = mongoose.model('Author', authorSchema)
