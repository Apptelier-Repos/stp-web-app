import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import { ErrorOutlined as ErrorOutlinedIcon } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const styles = theme => ({
  errorIcon: {
    verticalAlign: "middle",
    marginRight: theme.spacing(1)
  }
});

class InvalidCredentialsErrorMessage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box>
        <Typography color="error" variant="body2" noWrap>
          <ErrorOutlinedIcon className={classes.errorIcon} fontSize="small" />
          Las credenciales de acceso proporcionadas no son v&aacute;lidas
        </Typography>
      </Box>
    );
  }
}

InvalidCredentialsErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(InvalidCredentialsErrorMessage));
