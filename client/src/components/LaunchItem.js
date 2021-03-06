import React, { Fragment } from "react";
import Moment from "react-moment";

//Material UI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import useStyles from "../utils/cardStyles";

function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
  history,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className="center">
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Mission:{" "}
              <span
                className={clsx({
                  [classes.success]: launch_success,
                  [classes.fail]: !launch_success,
                })}
              >
                {mission_name}
              </span>
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              Date:{" "}
              <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => history.push(`/launch/${flight_number}`)}
            >
              Launch Details
            </Button>
          </CardActions>
        </Card>
      </div>
      <br />
    </Fragment>
  );
}

export default LaunchItem;
