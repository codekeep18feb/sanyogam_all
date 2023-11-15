import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useSpring, animated, useGesture } from 'react-spring';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

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
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
});

export default function InboxPractice() {
  const classes = useStyles();

  const [index, setIndex] = React.useState(0);

  const bind = useGesture({
    onDrag: ({ offset: [x], event: e, cancel }) => {
      e.preventDefault();
       // Adjust the sensitivity as needed
       const sensitivity = 0.5;
       const newIndex = Math.round(x / sensitivity / 310);
       setIndex(newIndex);
      // ... your existing logic
    },
  });

  const props = useSpring({
    transform: `translate3d(${-index * 310}px, 0, 0)`, // Adjust the width of the scroll item + margin
  });

  return (
    <div className={classes.scrollContainer} {...bind()}>
      <animated.div className={classes.innerContainer} style={props}>
        <div className={classes.scrollItem}>Content 1</div>
        <div className={classes.scrollItem}>Content 2</div>
        {/* Add more divs as needed */}
      </animated.div>
    </div>
  );
}
