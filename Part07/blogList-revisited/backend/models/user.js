const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
