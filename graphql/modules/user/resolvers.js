const { model } = require("mongoose");
const User = model("users");
const Post = model("posts");

module.exports = {
  Query: {
    users: async () => await User.find({}),
  },
  Mutation: {
    createUser: async (_, {name, picture, biography, location, githubID, githubUsername}) => { return await new User({name, picture, biography, location, githubID, githubUsername}).save() } 
  },
  User: {
    posts: async (parent) => {
      return await Post.find({author:parent.id});
    },
  }
};
