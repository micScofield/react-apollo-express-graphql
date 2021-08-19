import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, withRouter } from "react-router-dom";

import logo from "./logo.png";
import "./App.css";
import Launches from "./components/Launches";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "http://localhost:5000/api/graphql",
});

function App(props) {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <div className="logo">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
        </div>
        <Route exact path="/" component={Launches} />
        <Route exact path="/launch/:flight_number" component={Launch} />
      </div>
    </ApolloProvider>
  );
}

export default withRouter(App);
