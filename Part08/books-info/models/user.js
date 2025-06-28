const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  password: { type: String, required: true },
  favoriteGenre: String,
})

// userSchema.set('toJSON', {
//   transform: (document, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString()
//     delete returnedObj._id
//     delete returnedObj.__v
//     delete returnedObj.passwordHash
//   },
// })

module.exports = mongoose.model('User', userSchema)
