const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const path = require('path')

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");

  // graphql specific check
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    next();
  }
  next();
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.port || 5000

app.listen(PORT, () => console.log("Server started on 5000"));
