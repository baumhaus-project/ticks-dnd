/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import Card from './Card';
import './styles/DraggableCard.module.css';

export default function DraggableCard({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card item={item} />
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
