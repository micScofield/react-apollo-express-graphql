import { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import LaunchItem from "./LaunchItem";
import Spinner from "../components/UI/loader";
import MissionKey from "./missionKey";
import Grid from "@material-ui/core/Grid";

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

/*
<Grid container spacing="4" justifyContent="space-around">
              <Grid item xs={12} sm={6}>
                <Paper
                  style={{ height: "50px", width: "100%" }}
                  component={test}
                />
              </Grid>

              <Grid item xs={3} sm={6}>
                <Paper style={{ height: "50px", width: "100%" }} />
              </Grid>

              <Grid item xs={3} lg={12}>
                <Paper style={{ height: "50px", width: "100%" }} />
              </Grid>
            </Grid>
*/

function Launches({ history }) {
  console.log(history);
  return (
    <div>
      <h1 className="mb-1 mt-2">Launches</h1>

      <div className="mb-1">
        <MissionKey />
      </div>

      <Query query={LAUNCHES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) console.log(error);
          return (
            <Fragment>
              <Grid container spacing="4" justifyContent="space-around">
              {data &&
                data.launches.map((launch) => (
                    <Grid item sm={12} xs={12} md={6}>
                      <LaunchItem
                        key={launch.flight_number}
                        launch={launch}
                        history={history}
                      />
                    </Grid>
                ))}
              </Grid>
              
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
}

export default Launches;
