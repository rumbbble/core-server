const { gql } = require("apollo-server-express");
module.exports = gql`
  type Post {
    id: ID
    title: String!
    author: User!
    description: String
    repoURL: String
    demoURL: String
    image: String!
    likeCount: Int
    comments: [Comment]
    likes: [Like]
    likedByUser: Boolean
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    posts: [Post]
    post(postID: ID!): Post
    """
    **Example:**
    
    query {
      postsFromUser(userID: "5ed40ade318f0d4098aa6624"){
        title
      }
    }
    """
    postsFromUser(userID: ID!): [Post]
  }
  extend type Mutation {
    """
    Creating new post.

    **Example:**

    mutation {
      createPost(
        author: "5ed40ade318f0d4098aa6624"
        description: "A portfolio for my dog"
        title: "Portfolio"
        image: "dog"
        demoURL: "https://"
        repoURL: "https://"
      ) {
        author {
          name
        }
        description
        title
        image
        demoURL
        repoURL
      }
    }
    """
    createPost(
      title: String!
      description: String
      repoURL: String
      demoURL: String
      image: String!
      author: ID!
    ): Post
    editPost(
      postID: ID!
      title: String!
      description: String
      repoURL: String
      demoURL: String
      image: String!
    ): Post
    deletePost(
      postID: ID!
    ): Post
  }
`;
