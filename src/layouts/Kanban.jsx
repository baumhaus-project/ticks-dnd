import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import DroppableList from '../components/DroppableList';
import './style.css';

function item({ title, customer, assignees, description }) {
  return { id: uuidv4(), title, customer, assignees, description };
}

function column({ title, cards }) {
  return { id: uuidv4(), title, cards };
}

const columns = [
  column({
    title: 'Mailbox',
    cards: [
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
    ],
  }),
  column({
    title: 'In Progress',
    cards: [
      item({
        title: 'CardD',
        customer: 'CustomerC',
        assignees: 'EmployerB',
        description: 'This is the description of CardD',
      }),
    ],
  }),
  column({ title: 'Done', cards: [] }),
];

export default function Kanban() {
  const [data, updateData] = useState(columns);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // return if destination of drag is outside the context
    if (!result.destination) return;

    // index of destination object within array
    const index = data.findIndex((x) => x.id === destination.droppableId);
    // duplicate array
    const items = Array.from(data[index].cards);

    // Sorting when the destination is the same arrays
    if (source.droppableId === destination.droppableId) {
      // reorder cards with source index
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // update state
      updateData((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], cards: items },
        ...prev.slice(index + 1),
      ]);
    }

    // Movement from one array to another
    else {
      // index of source object within array
      const srcIndex = data.findIndex((x) => x.id === source.droppableId);
      // duplicate array
      const srcItems = Array.from(data[srcIndex].cards);
      const card = srcItems.find((x) => x.id === result.draggableId);

      // insert new card with destination index
      items.splice(destination.index, 0, card);
      // remove item from srcItems
      srcItems.splice(source.index, 1);

      // update state
      const firstIndex = index > srcIndex ? srcIndex : index;
      const secondIndex = index > srcIndex ? index : srcIndex;
      updateData((prev) => [
        ...prev.slice(0, firstIndex),
        { ...prev[firstIndex], cards: index > srcIndex ? srcItems : items },
        ...prev.slice(firstIndex + 1, secondIndex),
        { ...prev[secondIndex], cards: index > srcIndex ? items : srcItems },
        ...prev.slice(secondIndex + 1),
      ]);
    }
  };

  return (
    <div className="Kanban">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {data.map((col) => (
          <DroppableList key={uuidv4()} column={col} />
        ))}
      </DragDropContext>
    </div>
  );
}
