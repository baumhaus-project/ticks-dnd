import React from 'react';
import classes from './styles/Spinner.module.css';

export default function Spinner() {
  return (
    <div className={classes.circles}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
