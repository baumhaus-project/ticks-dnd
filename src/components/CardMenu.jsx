/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useStoreActions } from 'easy-peasy';

import Timer from './Timer';
import classes from './styles/CardMenu.module.css';

export default function CardMenu({ item, setReadonly }) {
  const [open, setOpen] = useState(false);
  const { deleteTicket } = useStoreActions((actions) => actions);

  return (
    <div className={classes.container}>
      <div
        className={classes.menubtn}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div />
        <div />
        <div />
      </div>
      <div className={classes.dropdowncontent}>
        {open ? (
          <>
            <button
              className={classes.btn}
              type="button"
              onClick={() => setReadonly((prev) => !prev)}
            >
              Edit
            </button>
            <button
              className={classes.btn}
              type="button"
              onClick={() => deleteTicket(item.id)}
            >
              Delete
            </button>
            <button className={classes.btn} type="button">
              Archive
            </button>{' '}
          </>
        ) : (
          <Timer />
        )}
      </div>
    </div>
  );
}

CardMenu.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setReadonly: PropTypes.func.isRequired,
};
