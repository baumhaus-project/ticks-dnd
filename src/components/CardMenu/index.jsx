/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { PropTypes, shape } from 'prop-types';
import { useStoreActions } from 'easy-peasy';
import './style.css';

export default function CardMenu({ item, setReadonly }) {
  const [open, setOpen] = useState(false);
  const { deleteTicket } = useStoreActions((actions) => actions);

  return (
    <div className="card-menu-container">
      <div
        className="card-menu-btn"
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div />
        <div />
        <div />
      </div>
      <div className={`dropdown-content${open ? ' visible' : ''}`}>
        <button type="button" onClick={() => setReadonly((prev) => !prev)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTicket(item.id)}>
          Delete
        </button>
        <button type="button">Archive</button>
      </div>
    </div>
  );
}

CardMenu.propTypes = {
  item: shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setReadonly: PropTypes.func.isRequired,
};
