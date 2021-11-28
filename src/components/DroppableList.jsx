/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import DraggableCard from './DraggableCard';
import './style.css';

export default function DroppableList(key, { title, cards }) {
  const { addCard } = useStoreActions((actions) => actions);

  return (
    <Droppable droppableId={key}>
      {(provided) => (
        <div className="column">
          <div className="column-header">
            <h2 className="column-title">{title}</h2>
            <button
              className="add-btn"
              type="button"
              onClick={() =>
                addCard({
                  listId: key,
                  card: {
                    id: uuidv4(),
                    title: '',
                    customer: '',
                    assignees: '',
                    description: '',
                  },
                })
              }
            >
              Add
            </button>
          </div>
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((item, index) => (
              <DraggableCard
                item={item}
                listId={key}
                index={index}
                key={uuidv4()}
              />
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
}

DroppableList.propTypes = {
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
};
