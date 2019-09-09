import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Link  } from 'react-router-dom';
import Header from './dumb_components/Header';
import './css/App.css'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    <div className="AppMain">
    <Header name="Select Your Use Case Base On Company"/>
    <Container fixed>
      <Grid container spacing={3} style={{margin:'auto'}}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <Button variant="outlined" className={classes.button}  component={Link} to="/default">Default</Button>
        </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <Button variant="outlined" className={classes.button}  component={Link} to="/unilever">Unilever</Button>
        </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <Button variant="outlined" className={classes.button}  component={Link} to="/apple">Apple</Button>
        </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <Button variant="outlined" className={classes.button}  component={Link} to="/nike">Nike</Button>
        </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <Button variant="outlined" className={classes.button}  component={Link} to="/ford">Ford</Button>
        </Paper>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}