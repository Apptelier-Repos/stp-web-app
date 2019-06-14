import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import SessionManager from "../session/sessionManager";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(8),
    flexGrow: 1
  }
});

class Index extends React.Component {
  handleClick = () => {
    SessionManager.closeSession();
    this.props.history.push("/signIn");
  };

  render() {
    return (
      <>
        <Typography>Index page</Typography>
        <Button onClick={this.handleClick}>Cerrar sesi&oacute;n</Button>
      </>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
