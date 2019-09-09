import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetList(props) {
  const classes = useStyles();

  if (!props.list) {
    return null;
  }  

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {props.list.map((item,key) =>
      <div key={key}>
        <ListItem>
         <ListItemText primary={item.name} />
            <ListItemIcon>
          <Typography >
            {item.total}
          </Typography>
          </ListItemIcon>
        </ListItem>
        <Divider/>   
      </div> 
      )}
      <Divider/>      
    </List>   
  );
}