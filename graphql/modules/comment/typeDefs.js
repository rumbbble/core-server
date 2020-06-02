const { gql } = require("apollo-server-express");
module.exports = gql`
  type Comment {
    content: String!
    post: Post!
    author: User!
    id: ID
  }
  extend type Query {
    comments: [Comment]
    """
    query for all comments of project.

    **Example:**

    query {
      commentsForPost(postID: "5ed40c7f4aced00b84cfe03f") {
        content
      }
    }
    """
    commentsForPost(postID: ID!): [Comment]
    """
    count all comments of project.

    **Example:**

    query {
      commentsForPostCount(postID: "5ed40c7f4aced00b84cfe03f")
    }
    """
    commentsForPostCount(postID: ID!): Int
  }
  extend type Mutation {
    """
    Creating new comment.

    **Example:**

    mutation {
      createComment(
        author: "5ed40ade318f0d4098aa6624"
        post: "5ed40c7f4aced00b84cfe03f"
        content: "really liked that one!"
      ) {
        author {
          name
        }
        post {
          title
        }
        content
      }
    }
    """
    createComment(
      content: String!
      post: ID!
      author: ID!
    ): Comment
  }
`;
