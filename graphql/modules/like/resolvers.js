const { model } = require("mongoose");
const Like = model("likes");
const Post = model("posts");
const User = model("users");

module.exports = {
  Query: {
    likes: async () => await Like.find({}),
    likesForPostCount: async (_, {postID}) => await Like.find({post:postID}).countDocuments(),
  },
  Mutation: {
    createLike: async (_, {post, author}) => { return await new Like({post, author}).save() } 
  },
  Like: {
    post: async(parent)=> {
      return await Post.findOne({ _id: parent.post });
    },
    author: async (parent) => {
      return await User.findOne({ _id: parent.author });
    },
  }
};
