const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '名稱尚未填寫']
    },
    content: {
      type: String,
      required: [true, '內容尚未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createdAt: {
      type: Number,
      default: new Date().getTime(),
      select: false
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;