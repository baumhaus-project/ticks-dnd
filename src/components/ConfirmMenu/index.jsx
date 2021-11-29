/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import './style.css';

export default function ConfirmMenu({ visible, onConfirm, onCancel }) {
  return (
    <div className={`confirm-menu ${visible ? 'visible' : 'hidden'}`}>
      <button type="button" className="cancel-btn" onClick={onCancel}>
        cancel
      </button>
      <button type="button" className="confirm-btn" onClick={onConfirm}>
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
