import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import signInImg1 from "../images/signIn1.png";

const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${signInImg1})` /* 1080x1617 */,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignIn extends React.Component {
  state = {
    userAccounts: []
  };

  componentDidMount() {
    fetch("https://stp-web-api.azurewebsites.net/api/values")
      .then(res => res.json())
      .then(data => {
        this.setState({ userAccounts: data });
      })
      .catch(console.log);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography>
                {this.state.userAccounts.map(ua => `${ua.id}: ${ua.username}`).join(", ")}
              </Typography>

              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Acceder
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recuérdame"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Acceder
                </Button>
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Powered by Apptelier.
                  </Typography>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(SignIn));
