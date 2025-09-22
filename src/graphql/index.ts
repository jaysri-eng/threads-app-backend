import { ApolloServer } from "@apollo/server";
import prismaClient from "../lib/db";
import {User} from './user/index.js'

async function createApolloServer(){
    const server = new ApolloServer({
    typeDefs:`
        type Query {
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }
    `, //schema
    resolvers:{
        Query: {
            ...User.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations
        }
    }, //actions or resolver
    });
    await server.start();
    return server;
}

export default createApolloServer;