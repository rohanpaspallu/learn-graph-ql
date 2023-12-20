import { ApolloServer } from "@apollo/server";
import { startStandAloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import db from "./_db.js";

const resolver = {
  Query: {
    reviews: () => reviews,
    games: () => db.games,
    author: () => authors,
  },
};
//server setup
const server = new ApolloServer({
  typeDefs,
  //typeDefs
  //resolvers
});

const { url } = await startStandAloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
