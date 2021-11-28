/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useStoreActions } from 'easy-peasy';

function CardHeader({ open, ticketId }) {
  const { deleteTicket } = useStoreActions((actions) => actions);

  return (
    <div className={`card-header ${open ? 'card-header-open' : ''}`}>
      <div className="btn-container">
        <button
          className="btn-small delete-btn"
          type="button"
          onClick={() => deleteTicket({ ticketId })}
        >
          delete
        </button>
        <button className="btn-small edit-btn" type="button">
          edit
        </button>
      </div>
    </div>
  );
}

CardHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  ticketId: PropTypes.string.isRequired,
};

export default function DraggableCard({ item, index }) {
  const [openHeader, setOpenHeader] = useState(false);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardHeader open={openHeader} ticketId={item.id} />
          <div className="card">
            <h3>Titel: {item.title}</h3>
            <h4>Customer: {item.customer}</h4>
            <p>Assignees: {item.assignee}</p>
            <button
              className="btn-small card-header-btn"
              type="button"
              onClick={() => setOpenHeader((prev) => !prev)}
            >
              {' '}
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}

DraggableCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    time_spent: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
