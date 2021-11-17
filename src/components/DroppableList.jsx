/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import DraggableCard from './DraggableCard';
import './style.css';

export default function DroppableList({ items, column }) {
  return (
    <Droppable droppableId={uuidv4()}>
      {(provided) => (
        <div className="column">
          <h2 className="column-title">{column.title}</h2>
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      assignees: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
