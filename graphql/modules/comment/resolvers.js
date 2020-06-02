const { model } = require("mongoose");
const Post = model("posts");
const Comment = model("comments");
const User = model("users");

module.exports = {
  Query: {
    comments: async () => await Comment.find({}),
    commentsForPost: async (_, {postID}) => await Comment.find({post:postID}),
    commentsForPostCount: async (_, {postID}) => await Comment.find({post:postID}).countDocuments(),
  },
  Mutation: {
    createComment: async (_, {content, post, author}) => { return await new Comment({content, post, author}).save() } 
  },
  Comment: {
    post: async(parent)=> {
      return await Post.findOne({ _id: parent.post });
    },
    author: async (parent) => {
      return await User.findOne({ _id: parent.author });
    },
  }
};
