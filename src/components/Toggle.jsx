/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './styles/Toggle.module.css';

export default function Toggle({ onClick }) {
  return (
    <div
      className={classes.toggle}
      aria-label="toggle description visible"
      role="button"
      tabIndex={0}
      onClick={onClick}
    />
  );
}

Toggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};
