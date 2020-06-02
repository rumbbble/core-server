const { model } = require("mongoose");
const User = model("users");
const Post = model("posts");
const Like = model("likes");
const Comment = model("comments");
const faker = require("faker");
const createUsers = async (amount = 11) => {
  let generatedUsers = [];
  for (let i = 0; i < amount; i++) {
    const name = faker.name.findName();
    const picture = faker.image.avatar();
    const biography = faker.lorem.sentences(5);
    const location = faker.address.state();
    const githubID = faker.random.number(9999999);
    const githubUsername = faker.name.firstName() + faker.name.jobArea();
    const user = await new User({
      name,
      picture,
      biography,
      location,
      githubID,
      githubUsername,
    });
    generatedUsers = [...generatedUsers, user.save()];
  }
  return generatedUsers;
};

const createPosts = async (amount = 11) => {
  let generatedPosts = [];
  const randomPeople = await User.aggregate([{ $sample: { size: 11 } }]);
  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.round(Math.random() * (randomPeople.length - 1));
    const author = randomPeople[randomIndex]._id;
    console.log('author', author)
    const description = faker.lorem.sentences(5);
    const title = faker.lorem.words(3);
    const image = faker.image.abstract();
    const demoURL = faker.internet.url();
    const repoURL = faker.internet.url();
    const post = await new Post({
      author,
      description,
      title,
      image,
      demoURL,
      repoURL,
    });
    generatedPosts = [...generatedPosts, await post.save()];
  }
  return generatedPosts;
};

const createLikes = async (amount = 11) => {
  let generatedLikes = [];
  const randomPeople = await User.aggregate([{ $sample: { size: 11 } }]);
  const randomPosts = await Post.aggregate([{ $sample: { size: 11 } }]);
  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.round(Math.random() * (randomPeople.length - 1));
    const author = randomPeople[randomIndex]._id;
    const post = randomPosts[randomIndex];
    const like = await new Like({
      author,
      post,
    });
    generatedLikes = [...generatedLikes, await like.save()];
  }
  return generatedLikes;
};

const createComments = async (amount = 11) => {
  let generatedComments = [];
  const randomPeople = await User.aggregate([{ $sample: { size: 11 } }]);
  const randomPosts = await Post.aggregate([{ $sample: { size: 11 } }]);
  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.round(Math.random() * (randomPeople.length - 1));
    const author = randomPeople[randomIndex]._id;
    const post = randomPosts[randomIndex];
    const content = faker.lorem.words(9);
    const comment = await new Comment({
      author,
      post,
      content,
    });
    generatedComments = [...generatedComments, await comment.save()];
  }
};

module.exports = async (amount = 11) => {
  const users = await createUsers(amount);
  console.log("Generated users", users);
  const posts = await createPosts(amount);
  console.log("Generated posts", posts);
  const comments = await createComments(amount);
  console.log("Generated comments", comments);
  const likes = await createLikes(amount);
  console.log("Generated likes", likes);
};
