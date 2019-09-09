import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from './List';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "5px"
  },
}));

export default function PaperSheet(props) {

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>  
        <Typography align="center" variant="h5" component="h3">
          <List list={props.list}/>
            {props.title}
        </Typography>
        <Typography align="center" variant="h3" component="h2">
            {props.value}
        </Typography>
      </Paper>
    </div>
  );
}