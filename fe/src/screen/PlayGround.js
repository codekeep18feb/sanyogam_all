import React from 'react'
import HorizontalScrollWithinItemWidthOnly from '../component/reusables/HorizontalScrollWithinItemWidthOnly'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    scrollContainer: {
      overflow: 'hidden',
      width: '100%',
      touchAction: 'pan-y',
    },
    innerContainer: {
      display: 'flex',
      whiteSpace: 'nowrap',
    },
    scrollItem: {
      flexShrink: 0,
      height:"100px",
      width: '300px',
      marginRight: '10px',
      border: '1px solid #ccc',
      padding: '10px',
    },
  });

export default function PlayGround() {
  const classes = useStyles();

  return (
    <HorizontalScrollWithinItemWidthOnly >
        <div className={classes.scrollItem}>Content 1</div>
        <div className={classes.scrollItem}>Content 2</div>
        <div className={classes.scrollItem}>Content 3</div>
    </HorizontalScrollWithinItemWidthOnly>
  )
}
