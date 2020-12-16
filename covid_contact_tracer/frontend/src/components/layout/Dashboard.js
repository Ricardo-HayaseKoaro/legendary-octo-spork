import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItems from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import ListLocation from '../locations/ListLocation';
import TimelineLocations from '../locations/TimelineLocations';
import SimpleMap from '../locations/LocationMaps';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { getLocations } from '../../actions/locations';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    getLocations: (startTime, endTime) => dispatch(getLocations(startTime, endTime))
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '70vh',
  },
  fixedHeight: {
    height: 240,
  },
  flexSection: {
    flexGrow: 1,
    display: 'flex',
    minHeight: 0,
  },
  
  flexColsScroll: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '70vh',
  },
  dateInput: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap'
  },

}));

function Dashboard(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [heatmap, setHeatmap] = React.useState(false);
  const [startTime, setStart] = React.useState("2017-05-24T10:30");
  const date_aux = new Date ();
  const [endTime, setEnd] = React.useState(date_aux.toISOString(Date.now()).slice(0,-8));

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Your Timeline
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItems/> 
      </Drawer>
      <main className={classes.content}>
        <Modal/>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box className={classes.dateInput}>
                  <TextField
                      id="datetime-local-start"
                      label="Start time"
                      type="datetime-local"
                      value={startTime}                      
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={event => setStart(event.target.value)}
                    />
                  <TextField
                      id="datetime-local-end"
                      label="End time"
                      type="datetime-local"
                      defaultValue={endTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={event => setEnd(event.target.value)}
                    />
                    <Box marginTop="15px">
                      <Button variant="outlined" color="primary" onClick={() => props.getLocations(startTime, endTime)}>
                        Load
                      </Button>
                    </Box>
              </Box>
              <br/>
              <Paper className={classes.paper} >
                <TimelineLocations />
              </Paper>
            </Grid>
             <Grid item xs={12} sm={6}>
              <Box className={classes.dateInput}>
                <FormControlLabel
                  control={
                    <Switch
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="check_heatmap"
                      color="primary"
                    />
                  }
                  label="View Heatmap"
                />
              </Box>
              <br/>
              <Paper className={classes.paper} >
                  <SimpleMap heatmap={heatmap}/>
                </Paper>
              </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);