const { model } = require("mongoose");
const Post = model("posts");
const User = model("users");
const Comment = model("comments");
const Like = model("comments");

module.exports = {
  Query: {
    posts: async () => await Post.find({}),
    post: async (_, {postID}) => await Post.findById(postID),
    postsFromUser: async (_, {userID}) =>  await Post.find({author:userID}),
  },
  Mutation: {
    createPost: async (_, {title, description, repoURL, demoURL, image, author}) => await new Post({title, description, repoURL, demoURL, image, author}).save(),
    editPost: async (_, {postID, title, description, repoURL, demoURL, image, author}) => await Post.updateOne({ _id: postID }, { $set: { title, description, repoURL, demoURL, image, author } }),
    deletePost: async (_, {postID}) => {
      await Post.findByIdAndDelete(projectId)
      await Comment.find({ post: projectId }).remove();
      await Like.find({ post: projectId }).remove();
    },
  },
  Post: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
    comments: async (parent) => {
      return await Comment.find({ post: parent.id });
    },
    likes: async(parent) => {
      return await Like.find({ post: parent.id })
    },
    // this will determine whether or not the post is liked by the auhenticated user or not
    likedByUser: async(parent, { user }) => {
      const like = await Like.findOne({ post: parent.id, user })
      if(like) return true
      else return false
    },
    likeCount: async(parent) => {
      return await Like.countDocuments({ post: parent.id })
    }
  }
};
