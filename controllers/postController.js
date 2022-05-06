const Post = require('../models/Post')
const successHandle = require('../service/successHandle')
const errorHandle = require('../service/errorHandle')

const postController = {
  async getAllPosts(req, res)  {
    const data = await Post.find();
    successHandle({res, data});
  },

  async createPost(req, res) {
    try {
      console.log(req.body)
      const { name, content } = req.body;
      if(!name || !content) {
        errorHandle({
          res,
          message: '資料格式錯誤 或 欄位填寫未完成',
        });
      } 
      else {
        const data = await Post.create(req.body);
        successHandle({res, data});
      }
    } 
    catch(error) {
      errorHandle({
        res,
        error: error.message
      });
    }
  },

  async updatePost(req, res) {
    try {
      const id = req.params.id;
      const { name, content } = req.body;
      const isExists = await Post.findOne({_id: id});
      if(isExists && (!name || !content)) {
        await Post.findByIdAndUpdate(id, req.body);
        const data = await Post.findOne({_id: id});
        successHandle({res, data});
      } 
      else {
        errorHandle({
          res,
          message: '資料格式錯誤 或 找不到對應ID',
        });
      }
    } 
    catch(error) {
      errorHandle({
        res,
        error: error.message
      });
    }
  },

  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const isExists = await Post.findOne({_id: id});
      if(isExists) {
        const data = await Post.findByIdAndDelete(id);
        successHandle({res, data});
      } 
      else {
        errorHandle({
          res,
          message: '找不到對應ID',
        });
      }
    } 
    catch(error) {
      errorHandle({
        res,
        error: error.message
      });
    }
  },

  async deleteAllPosts(req, res) {
    await Post.deleteMany({});
    const data = await Post.find();
    successHandle({res, data});
  }
}

module.exports = postController