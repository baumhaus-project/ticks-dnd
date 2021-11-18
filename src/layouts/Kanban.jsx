import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import DroppableList from '../components/DroppableList';
import './style.css';

export default function Kanban() {
  const { data } = useStoreState((state) => state);
  const { updateData } = useStoreActions((actions) => actions);

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
      updateData([
        ...data.slice(0, index),
        { ...data[index], cards: items },
        ...data.slice(index + 1),
      ]);
    }

    // Move from one array to another
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
      updateData([
        ...data.slice(0, firstIndex),
        { ...data[firstIndex], cards: index > srcIndex ? srcItems : items },
        ...data.slice(firstIndex + 1, secondIndex),
        { ...data[secondIndex], cards: index > srcIndex ? items : srcItems },
        ...data.slice(secondIndex + 1),
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
