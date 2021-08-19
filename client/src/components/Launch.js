import { Fragment, useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Spinner from "../components/UI/loader";
import clsx from "clsx";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LaunchIcon from "@material-ui/icons/Launch";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "../utils/cardStyles";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        video_link
        wikipedia
      }
      details
    }
  }
`;
function Launch({ history, match }) {
  let { flight_number } = match.params;
  flight_number = parseInt(flight_number);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // Accordion
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //   const accordionCssClasses = []

  return (
    <Fragment>
      <div className="container">
        <div className="mt-2 mb-1">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon /> Go Back
          </Button>
        </div>

        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) console.log(error);

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type },
              links: { video_link, wikipedia },
              details,
            } = data.launch;

            console.log(launch_success);
            return (
              <div className="center">
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      Mission: {mission_name}
                    </Typography>

                    <Typography
                      className={classes.subtitle}
                      color="textSecondary"
                      gutterBottom
                    >
                      Launch Details
                    </Typography>

                    <Typography variant="h5">
                      {bull} Flight Number: {flight_number}
                    </Typography>

                    <Typography variant="h5">
                      {bull} Launch Year: {launch_year}
                    </Typography>

                    <Typography variant="h5">
                      {bull} Launch Successful: {launch_success ? "Yes" : "No"}
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <Typography
                      className={classes.subtitle}
                      color="textSecondary"
                      gutterBottom
                    >
                      Rocket Details
                    </Typography>

                    <Typography variant="h5">
                      {bull} Rocket ID: {rocket_id}
                    </Typography>

                    <Typography variant="h5">
                      {bull} Rocket Name: {rocket_name}
                    </Typography>

                    <Typography variant="h5">
                      {bull} Rocket Type: {rocket_type}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="medium"
                      href={video_link}
                      target="_blank"
                    >
                      <YouTubeIcon /> Watch on Youtube
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="medium"
                      href={wikipedia}
                      target="_blank"
                    >
                      Learn More <LaunchIcon />
                    </Button>

                    {details && (
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show More"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    )}
                  </CardActions>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Details:</Typography>
                      <Typography paragraph>
                        {console.log(details)}
                        {details}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            );
          }}
        </Query>
      </div>
    </Fragment>
  );
}

export default Launch;

/*

*/
