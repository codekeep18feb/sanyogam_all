import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const ProgressBar = ({totalWorkDone}) => {
  const [progress, setProgress] = useState(0);
  const intervalDuration = 1000; // interval duration in milliseconds
  const numTasks = totalWorkDone.length; // number of tasks

  useEffect(() => {
    let taskIndex = 0;

    // Function to update progress at fixed intervals
    const updateProgress = () => {
      setProgress((prevProgress) => {
        const taskProgress = totalWorkDone[taskIndex] * 100; // convert task progress to percentage
        const newProgress = prevProgress + taskProgress / numTasks;

        if (newProgress >= 100 || taskIndex === numTasks - 1) {
          clearInterval(intervalId);
          return 100;
        }

        taskIndex++;
        return newProgress;
      });
    };

    // Initial update
    updateProgress();

    // Set interval to update progress
    const intervalId = setInterval(updateProgress, intervalDuration);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Typography variant="subtitle2">Progress: {progress.toFixed(2)}%</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default ProgressBar;
