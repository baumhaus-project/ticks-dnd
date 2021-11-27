/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

export default function DraggableCard({ item, listId, index }) {
  const { deleteCard } = useStoreActions((actions) => actions);

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
            <p>Assignees: {item.assignees}</p>
          </div>
          <button
            className="delete-btn"
            type="button"
            onClick={() =>
              deleteCard({
                listId,
                cardId: item.id,
              })
            }
          >
            x
          </button>
          <Draggable />
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
    assignees: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
