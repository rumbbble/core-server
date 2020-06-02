const { gql } = require("apollo-server-express");
module.exports = gql`
  type Like {
    post: Post!
    author: User!
    id: ID
  }
  extend type Query {
    likes: [Like]
    """
    count all likes of project.

    **Example:**

    query {
      likesForPostCount(postID: "5ed40c7f4aced00b84cfe03f")
    }
    """
    likesForPostCount(postID: ID!): Int
  }
  extend type Mutation {
    """
    Creating new like.

    **Example:**

    mutation {
      createLike(
        author: "5ed40ade318f0d4098aa6624"
        post: "5ed40c7f4aced00b84cfe03f"
      ) {
        author {
          name
        }
        post {
          title
        }
      }
    }
    """
    createLike(post: ID!, author: ID!): Like
  }
`;
