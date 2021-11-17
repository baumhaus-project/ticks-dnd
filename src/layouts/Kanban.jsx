import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import DroppableList from '../components/DroppableList';

function item({ title, customer, assignees, description }) {
  return { id: uuidv4(), title, customer, assignees, description };
}

const data = [
  item({
    title: 'CardA',
    customer: 'CustomerA',
    assignees: 'EmployerA',
    description: 'This is the description of CardA',
  }),
  item({
    title: 'CardB',
    customer: 'CustomerA',
    assignees: 'EmployerA',
    description: 'This is the description of CardB',
  }),
  item({
    title: 'CardC',
    customer: 'CustomerB',
    assignees: 'EmployerC',
    description: 'This is the description of CardC',
  }),
  item({
    title: 'CardD',
    customer: 'CustomerC',
    assignees: 'EmployerB',
    description: 'This is the description of CardD',
  }),
];

export default function Kanban() {
  const [cards, updateCards] = useState(data);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCards(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <DroppableList items={cards} />
    </DragDropContext>
  );
}
