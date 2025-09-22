import express from "express"
import { expressMiddleware } from '@as-integrations/express5';
import createApolloServer from "./graphql/index.js";

const app = express();
const PORT = 3000

app.get('/',(req,res)=>{
    res.json({message:"Server is running"});
});
app.use(
  '/graphql',
  express.json(),
  expressMiddleware(await createApolloServer()),
);
app.listen(PORT,()=>console.log(`Server started at: ${PORT}`));