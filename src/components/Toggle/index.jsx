/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import './style.css';

export default function Toggle({ onClick }) {
  return (
    <div
      className="description-toggle"
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
