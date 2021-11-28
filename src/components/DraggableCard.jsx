/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

export default function DraggableCard({ item, index }) {
  const { deleteTicket } = useStoreActions((actions) => actions);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card">
            <h3>Titel: {item.title}</h3>
            <h4>Customer: {item.customer}</h4>
            <p>Assignees: {item.assignee}</p>
          </div>
          <button
            className="delete-btn"
            type="button"
            onClick={() =>
              deleteTicket({
                ticketId: item.id,
              })
            }
          >
            x
          </button>
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
