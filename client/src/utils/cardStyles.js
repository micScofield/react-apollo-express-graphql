import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    // maxWidth: "60%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bullet: {
    display: "inline-block",
    marginRight: "2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 28,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: '1s'
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export default useStyles;
