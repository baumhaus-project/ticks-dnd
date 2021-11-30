import React, { useState, useEffect } from 'react';

import { ReactComponent as StartButton } from './icons/start.svg';
import { ReactComponent as StopButton } from './icons/stop.svg';

import classes from './styles/Timer.module.css';

export default function Timer() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (running) {
        setTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div className={classes.container}>
      {running ? (
        <StopButton
          className={`${classes.btn} ${
            running ? classes.running : classes.stopped
          }`}
          onClick={() => setRunning(false)}
        />
      ) : (
        <StartButton
          className={`${classes.btn} ${
            running ? classes.running : classes.stopped
          }`}
          onClick={() => setRunning(true)}
        />
      )}
      <p
        className={`${classes.text} ${
          running ? classes.running : classes.stopped
        }`}
      >
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </p>
    </div>
  );
}
