import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    reviews: () => db.reviews,
    review: (_, args) => db.reviews.find((review) => args.id === review.id),
    games: () => db.games,
    game: (_, args) => db.games.find((game) => game.id === args.id),
    authors: () => db.authors,
    author: (_, args) => db.games.find((author) => author.id === args.id),
  },
  Game: {
    reviews: (parent) => db.reviews.filter((r) => r.game_id === parent.id),
  },
  Author: {
    reviews: (parent) => db.reviews.filter((r) => r.author_id === parent.id),
  },
  Review: {
    author: (parent) => db.authors.find((a) => a.id === parent.author_id),
    game: (parent) => db.games.find((g) => g.id === parent.game_id),
  },
  Mutation: {
    deleteGame: (_, args) => {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    deleteAuthor: (_, args) => {
      db.authors = db.authors.filter((a) => a.id !== args.id);
      return db.authors;
    },
    deleteReview: (_, args) => {
      db.reviews = db.reviews.filter((r) => r.id !== args.id);
      return db.reviews;
    },
    addGame: (_, args) => {
      let game = { ...args.game, id: db.games.length };
      db.games.push(game);
      return game;
    },
    addAuthor: (_, args) => {
      let author = { ...args.author, id: db.authors.length };
      db.authors.push(game);
      return author;
    },
    addReview: (_, args) => {
      let review = { ...args.review, id: db.reviews.length };
      db.reviews.push(game);
      return review;
    },

    addGame: (_, args) => {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });
      return db.games.find((g) => g.id === args.id);
    },

    addAuthor: (_, args) => {
      db.authors = db.authors.map((g) => {
        if (a.id === args.id) {
          return { ...a, ...args.edits };
        }
        return a;
      });
      return db.authors.find((a) => a.id === args.id);
    },

    addReview: (_, args) => {
      db.reviews = db.reviews.map((r) => {
        if (r.id === args.id) {
          return { ...r, ...args.edits };
        }
        return r;
      });
      return db.reviews.find((r) => r.id === args.id);
    },
  },
};
//server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //typeDefs
  //resolvers
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
