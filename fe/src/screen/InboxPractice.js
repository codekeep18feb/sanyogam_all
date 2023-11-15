import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';


const useStyles = makeStyles({
  scrollContainer: {
    overflow: 'hidden',
  },
  innerContainer: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  scrollItem: {
    flexShrink: 0,
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
});

export default function InboxPractice() {
  const classes = useStyles();

  return (
    <div className={classes.scrollContainer}>
      <SwipeableViews enableMouseEvents>
        <div className={classes.innerContainer}>
          <div className={classes.scrollItem}>
            Content 1
          </div>
          <div className={classes.scrollItem}>
            Content 2
          </div>
          {/* Add more divs as needed */}
        </div>
      </SwipeableViews>
    </div>
  );
}
