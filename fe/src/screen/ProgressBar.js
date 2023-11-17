import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress increase over time (you can replace this with your own logic)
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Typography variant="subtitle2">Progress: {progress}%</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default ProgressBar;
