import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function WhereNextCard() {
  const classes = useStyles();

  function handleFormSubmission(e) {
    e.preventDefault();

    // make call to Roadgoat API to search by city
    // possible filtering by best match/most popular
    // make use of their known for functionality
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        style={{
          justifyContent: "center",
          minWidth: "15vw",
          minHeight: "30vh",
          borderRadius: "15px",
        }}
        className={classes.root}
        variant="outlined"
      >
        <CardContent>
          <Typography
            style={{ paddingBottom: "10px" }}
            variant="h5"
            component="h1"
            align="center"
            color="textPrimary"
          >
            Trip Planner
          </Typography>
          <Typography
            style={{ paddingBottom: "10px" }}
            variant="subtitle1"
            component="h2"
            align="center"
            color="textSecondary"
          >
            Plan your next adventure today!
          </Typography>
          <form
            className={classes.root}
            align="center"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-size-small"
              label="Where next?"
              variant="filled"
              size="small"
              margin="fullWidth"
            />
          </form>
          <Typography
            style={{ paddingTop: "20px" }}
            variant="subtitle1"
            component="h2"
            align="center"
            color="textSecondary"
          >
            Filters:
          </Typography>
          <Grid container justify="center">
            <FormControl className={classes.formControl}>
              <InputLabel id="sort">Sort By:</InputLabel>
              <Select labelId="sort-by" id="sort-by">
                <MenuItem value={"Best Match"}>Best Match</MenuItem>
                <MenuItem value={"Most Popular"}>Most Popular</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="known-for">Known For:</InputLabel>
              <Select labelId="known-for" id="knownFor">
                <MenuItem value={"Charming"}>Charming</MenuItem>
                <MenuItem value={"Foodie"}>Foodie</MenuItem>
                <MenuItem value={"Nightlife"}>Nightlife</MenuItem>
                <MenuItem value={"Architecture"}>Architecture</MenuItem>
                <MenuItem value={"History"}>History</MenuItem>
                <MenuItem value={"Museums"}>Museums</MenuItem>
                <MenuItem value={"Performing Arts"}>Performing Arts</MenuItem>
                <MenuItem value={"Outdoorsy"}>Outdoorsy</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button component={Link} to="/" type="submit" size="small">
            Let's Go!
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withRouter(WhereNextCard);
