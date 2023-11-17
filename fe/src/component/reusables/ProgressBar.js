import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ProgressBar = ({ totalWorkDone }) => {
  const [progress, setProgress] = useState(0);
  const intervalDuration = 1000; // interval duration in milliseconds
  const totalWorkSum = totalWorkDone.reduce((sum, taskProgress) => sum + taskProgress, 0);
  const targetProgress = (totalWorkSum / totalWorkDone.length) * 100;

  useEffect(() => {
    let taskIndex = 0;

    // Function to update progress at fixed intervals
    const updateProgress = () => {
      setProgress((prevProgress) => {
        const taskProgress = totalWorkDone[taskIndex] * 100; // convert task progress to percentage
        const newProgress = prevProgress + taskProgress / totalWorkSum;

        if (newProgress >= targetProgress || taskIndex === totalWorkDone.length - 1) {
          clearInterval(intervalId);
          return targetProgress;
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
  }, [totalWorkDone, totalWorkSum, targetProgress]);

  return (
    <>
    <Grid container justifyContent={"space-between"} style={{color:"blue",opacity:.7}}>
      <Grid item>

      <Typography variant="subtitle2" >Your Profile Score:</Typography>
      </Grid>
      <Grid item>
      <Typography variant="subtitle2">{progress.toFixed(2)}%</Typography>

      </Grid>
    
    </Grid>
      <div style={{marginTop:"7px"}}>
      <LinearProgress variant="determinate" value={progress} color={"primary"} sx={{ height: 10,borderRadius:10, backgroundColor: 'grey', }} />

      </div>
    
    </>
  );
};

export default ProgressBar;
