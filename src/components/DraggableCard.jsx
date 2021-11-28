/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import CardMenu from './CardMenu';

export default function DraggableCard({ item, index }) {
  const [readonly, setReadonly] = useState(true);
  const [ticket, setTicket] = useState(item);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form className="card">
            <label htmlFor="title">Title</label>
            <input
              className={readonly ? 'readonly' : 'editable'}
              type="text"
              id="title"
              name="title"
              value={ticket.title}
              readOnly={readonly}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
            <label htmlFor="customer">Customer</label>
            <input
              className={readonly ? 'readonly' : 'editable'}
              type="text"
              id="customer"
              name="customer"
              value={ticket.customer}
              readOnly={readonly}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, customer: e.target.value };
                })
              }
            />
            <label htmlFor="assignee">Assignee</label>
            <input
              className={readonly ? 'readonly' : 'editable'}
              type="text"
              id="assignee"
              name="assignee"
              value={ticket.assignee}
              readOnly={readonly}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, assignee: e.target.value };
                })
              }
            />
            <CardMenu item={item} setReadonly={setReadonly} />
          </form>
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
