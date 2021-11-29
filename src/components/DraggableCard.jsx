/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import CardMenu from './CardMenu';
import Toggle from './Toggle';
import ConfirmMenu from './ConfirmMenu';

export default function DraggableCard({ item, index }) {
  const [readonly, setReadonly] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [ticket, setTicket] = useState(item);

  const { persons } = useStoreState((state) => state);
  const { editTicket } = useStoreActions((actions) => actions);

  const inputAttributes = {
    className: readonly ? 'readonly' : 'editable',
    disabled: readonly,
    readOnly: readonly,
    spellCheck: false,
    type: 'text',
  };

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
              id="title"
              name="title"
              {...inputAttributes}
              value={ticket.title}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
            <label htmlFor="customer">Customer</label>
            <input
              id="customer"
              name="customer"
              {...inputAttributes}
              value={ticket.customer}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, customer: e.target.value };
                })
              }
            />
            <label htmlFor="assignee">Assignee</label>
            <select
              name="assignee"
              id="assignee"
              {...inputAttributes}
              value={ticket.assignee}
              onChange={(e) =>
                setTicket((prev) => {
                  return { ...prev, assignee: e.target.value };
                })
              }
            >
              {persons.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>

            <div
              display="flex"
              className={showDescription ? 'visible' : 'hidden'}
            >
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                {...inputAttributes}
                value={ticket.description}
                onChange={(e) =>
                  setTicket((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </div>
            <ConfirmMenu
              visible={!readonly}
              onCancel={() => {
                setReadonly(true);
                setTicket(item);
              }}
              onConfirm={() => {
                setReadonly(true);
                editTicket({ ticket });
              }}
            />
            <CardMenu item={item} setReadonly={setReadonly} />
            <Toggle onClick={() => setShowDescription((prev) => !prev)} />
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
