/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './style.css';

export default function CardMenu() {
  const [open, setOpen] = useState(false);

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
        <button type="button">Edit</button>
        <button type="button">Delete</button>
        <button type="button">Archive</button>
      </div>
    </div>
  );
}
