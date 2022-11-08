const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//Database Connection
const URL = "mongodb://localhost:27017";

mongoose.connect(
  URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB Connected")
);

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log("Server running on PORT 4000"));
};

startServer();
