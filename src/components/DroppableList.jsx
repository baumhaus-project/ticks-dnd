/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import DraggableCard from './DraggableCard';
import './style.css';

export default function DroppableList({ column }) {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div className="column">
          <h2 className="column-title">{column.title}</h2>
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.cards.map((item, index) => (
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
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        customer: PropTypes.string.isRequired,
        assignees: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};
