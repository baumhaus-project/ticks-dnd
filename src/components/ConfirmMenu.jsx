/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './styles/ConfirmMenu.module.css';

export default function ConfirmMenu({ visible, onConfirm, onCancel }) {
  return (
    <div className={visible ? classes.visible : classes.hidden}>
      <button className={classes.btn} type="button" onClick={onCancel}>
        cancel
      </button>
      <button className={classes.btn} type="button" onClick={onConfirm}>
        confirm
      </button>
    </div>
  );
}

ConfirmMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
