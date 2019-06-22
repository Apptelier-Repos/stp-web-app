import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});

class Index extends React.Component {
  static pageDisplayName = "Tablero de Inicio";

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9} hidden={this.props.attendanceSummary !== "visible"}>
          <Paper className={fixedHeightPaper}>
            <Typography>Registro de ingresos a transporte</Typography>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3} hidden={this.props.clock !== "visible"}>
          <Paper className={fixedHeightPaper}>
            <Typography>{new Date().toTimeString().split(" ")[0]}</Typography>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper} />
        </Grid>
      </Grid>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
