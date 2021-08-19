import React, { useState, Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
  const [launches, setLaunches] = useState([]);

  console.log(launches);

  return (
    <div>
      <h1>Hello</h1>
      <Query query={LAUNCHES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          return (
            <Fragment>
              {data.launches.map((launch) => (
                  JSON.stringify(launch)
                // <LaunchItem key={launch.flight_number} launch={launch} />
              ))}
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
}

export default Launches;
