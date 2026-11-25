const mongoose = require('mongoose')

// Global plugin to automatically format all outputs to JSON cleanly
mongoose.plugin((schema) => {
  schema.set('toJSON', {
    transform: (document, returnedObject) => {
      if (returnedObject._id) {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
      }
      delete returnedObject.__v
    },
  })
})

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Blog', blogSchema)
