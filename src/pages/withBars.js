import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PoweredByApptelier from "../components/PoweredByApptelier";
import { mainListItems, secondaryListItems } from "../pages/listItems";
import SessionManager from "../session/sessionManager";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
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

function withBars(WrappedComponent, { ...args }) {
  class WithBars extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        drawerOpen: false,
        menuAppBarAnchorEl: null
      };
    }

    handleDrawerOpen = () => {
      this.setState({ drawerOpen: true });
    };
    handleDrawerClose = () => {
      this.setState({ drawerOpen: false });
    };

    handleMenuAppBarOpen = event => {
      this.setState({ menuAppBarAnchorEl: event.currentTarget });
    };

    handleMenuAppBarClose = event => {
      this.setState({ menuAppBarAnchorEl: null });
      switch (event.currentTarget.id) {
        case "signout":
          SessionManager.closeSession();
          this.props.history.push("/signIn");
          break;
        default:
      }
    };

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, this.state.drawerOpen && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  this.state.drawerOpen && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {WrappedComponent.pageDisplayName}
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenuAppBarOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.menuAppBarAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(this.state.menuAppBarAnchorEl)}
                onClose={this.handleMenuAppBarClose}
              >
                <MenuItem id="profile" onClick={this.handleMenuAppBarClose}>
                  Perfil
                </MenuItem>
                <MenuItem id="signout" onClick={this.handleMenuAppBarClose}>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose)
            }}
            open={this.state.drawerOpen}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <WrappedComponent {...args} />
            </Container>
            <PoweredByApptelier />
          </main>
        </div>
      );
    }
  }

  WithBars.displayName = `WithBars(${getDisplayName(WrappedComponent)})`;

  WithBars.propTypes = {
    classes: PropTypes.object.isRequired
  };

  return withRoot(withStyles(styles)(WithBars));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withBars;
