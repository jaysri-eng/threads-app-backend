import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import prismaClient from "./lib/db.js";

const app = express();
const PORT = 3000

app.get('/',(req,res)=>{
    res.json({message:"Server is running"});
});
const server = new ApolloServer({
  typeDefs:`
    type Query {
        hello: String,
        say(name:String): String
    }
    type Mutation {
        createUser(email: String!,firstName: String!, lastName: String!,password:String!):Boolean

    }
  `, //schema
  resolvers:{
    Query: {
        hello: () => "Hey, hello",
        say:(_,{name}:{name:String})=>`hey ${name}`
    },
    Mutation: {
        createUser: async (_,
            {firstName, lastName, email,password}:{
                firstName:string; lastName:string; 
                email:string;password:string
            }
        ) => {
            await prismaClient.user.create({
                data: {
                    email,firstName,lastName,password,salt:"random_salt"
                }
            });
            return true;
        }
    }
  }, //actions or resolver
});
await server.start();
app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server),
);
app.listen(PORT,()=>console.log(`Server started at: ${PORT}`));