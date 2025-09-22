import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();
const PORT = 3000

app.get('/',(req,res)=>{
    res.json({message:"Server is running"});
});
const server = new ApolloServer({
  typeDefs:`
    type Query {
        hello: String
        say(name:String): String
    }
  `, //schema
  resolvers:{
    Query: {
        hello: () => "Hey, hello",
        say:(_,{name}:{name:String})=>`hey ${name}`
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