const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    name: String
    picture: String
    biography: String
    location: String
    posts: [Post]
    githubID: Int
    githubUsername: String
    id: ID
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    """
    Creating new users.

    **Example:**

    mutation {
      createUser(
        name: "test"
        picture: "dog"
        biography: "i am a huuuman"
        location: "Austria"
        githubID: 2
        githubUsername: "test"
      ) {
        name
      }
    }
    """
    createUser(
      name: String
      picture: String
      biography: String
      location: String
      githubID: Int
      githubUsername: String
    ): User
  }
`;
