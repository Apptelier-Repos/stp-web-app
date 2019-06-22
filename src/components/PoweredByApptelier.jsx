import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function PoweredByApptelier() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Powered with ❤️ by "}
      <Link color="inherit" href="https://github.com/apptelier/">
        Apptelier
      </Link>
      .
    </Typography>
  );
}

export default PoweredByApptelier;
