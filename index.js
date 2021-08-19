const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    
    next()
})

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next()
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server started on 5000"));
