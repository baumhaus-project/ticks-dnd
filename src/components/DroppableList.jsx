/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import DraggableCard from './DraggableCard';
import './style.css';

export default function DroppableList({ id, title, cards }) {
  const { saveTicket } = useStoreActions((actions) => actions);

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="column">
          <div className="column-header">
            <h2 className="column-title">{title}</h2>
            <button
              className="add-btn"
              type="button"
              onClick={() =>
                saveTicket({
                  ticket: {
                    title: 'NewTicket',
                    description: '',
                    customer: 'Customer A',
                    assignee: '38fbb97a-cc16-45a0-a822-8ad189e3e2c2',
                    time_spent: 0,
                    active: true,
                    status: 'OPEN',
                  },
                })
              }
            >
              +
            </button>
          </div>
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((item, index) => (
              <DraggableCard item={item} index={index} key={uuidv4()} />
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
}

DroppableList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      time_spent: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
