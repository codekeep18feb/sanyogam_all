import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function HorizontalScroll({children}) {
  const classes = useStyles();
  const innerContainerRef = useRef(null);

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const innerContainer = innerContainerRef.current;
    if (innerContainer) {
      const numberOfItems = innerContainer.children.length;
      const maxIndex = Math.max(0, numberOfItems - 1);
      // Update the index to stay within the bounds
      setIndex((prevIndex) => Math.min(Math.max(prevIndex, 0), maxIndex));
    }
  }, [index]);

  const bind = useGesture({
    onDrag: ({ offset: [x], event: e }) => {
      e.preventDefault();
      const sensitivity = 0.5;
      const newIndex = Math.round(-x / sensitivity / 310);
      setIndex(newIndex);
    },
  });

  const props = useSpring({
    transform: `translate3d(${-index * 310}px, 0, 0)`,
  });

  return (
    <div className={classes.scrollContainer} {...bind()}>
      <animated.div className={classes.innerContainer} style={props} ref={innerContainerRef}>
        
        {children}
        {/* Add more divs as needed */}
      </animated.div>
    </div>
  );
}
