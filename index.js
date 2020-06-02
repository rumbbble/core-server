const express = require("express");
const passport = require("passport");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const app = express();

require("./models/User");
require("./models/Post");
require("./models/Comment");
require("./models/Like");
const modules = require("./graphql");

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB Connected")
  }
)
require("./services/passport");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user.js");
const projectsRouter = require("./routes/projects");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", projectsRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/uploads", express.static("uploads"));

const server = new ApolloServer({
  modules,
  context: async ({ req, res }) => ({ req, res }), // now we can access express objects from apollo context arg
  playground: true, // maybe disable on full deployment
  introspection: true,
});

app.get("/test", (req,res)=>{
  console.log(mongoose.connection.readyState);
  
  res.end();
})

server.applyMiddleware({ app });
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
