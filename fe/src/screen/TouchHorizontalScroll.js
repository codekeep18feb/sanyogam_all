import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles({
  scrollContainer: {
    overflow: 'hidden',
    width: '100%',
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

export default function TouchHorizontalScroll() {
  const classes = useStyles();

  const [index, setIndex] = React.useState(0);

  const handleWheel = (e) => {
    // Adjust the sensitivity as needed
    const sensitivity = 0.1;
    const delta = e.deltaY || e.detail || e.wheelDelta;

    // Update the index based on the wheel movement
    setIndex((prevIndex) => prevIndex + Math.sign(delta) * sensitivity);
  };

  const props = useSpring({
    transform: `translate3d(${-index * 310}px, 0, 0)`, // Adjust the width of the scroll item + margin
  });

  return (
    <div className={classes.scrollContainer} onWheel={handleWheel}>
      <animated.div className={classes.innerContainer} style={props}>
        <div className={classes.scrollItem}>
          Content 1
        </div>
        <div className={classes.scrollItem}>
          Content 2
        </div>
        {/* Add more divs as needed */}
      </animated.div>
    </div>
  );
}
