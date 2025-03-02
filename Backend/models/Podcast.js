import mongoose from "mongoose"

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    required: true
  }
})

const Podcast = mongoose.model('Podcast', podcastSchema)
export default Podcast

