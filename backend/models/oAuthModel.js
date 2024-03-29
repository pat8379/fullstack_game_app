const mongoose = require('mongoose')

const oAuthSchema = mongoose.Schema(
    {  googleId: {
        type: String,
        required: true,
      },
      displayName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
)

module.exports = mongoose.model('OAuth', oAuthSchema)