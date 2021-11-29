import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import DroppableList from '../components/DroppableList';
import './style.css';
import Spinner from '../components/Spinner';

export default function Kanban() {
  const [loading, setLoading] = useState(true);
  const { tickets } = useStoreState((state) => state);
  const { loadTickets, loadPersons, setTickets } = useStoreActions(
    (actions) => actions,
  );

  useEffect(() => {
    Promise.allSettled([loadTickets(), loadPersons()]).then(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // return if destination of drag is outside the context
    if (!result.destination) return;

    // index of destination object within array
    const index = tickets.findIndex((x) => x.id === destination.droppableId);
    // duplicate array
    const items = Array.from(tickets[index].cards);

    // Sorting when the destination is the same arrays
    if (source.droppableId === destination.droppableId) {
      // reorder cards with source index
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // update state
      setTickets([
        ...tickets.slice(0, index),
        { ...tickets[index], cards: items },
        ...tickets.slice(index + 1),
      ]);
    }

    // Move from one array to another
    else {
      // index of source object within array
      const srcIndex = tickets.findIndex((x) => x.id === source.droppableId);
      // duplicate array
      const srcItems = Array.from(tickets[srcIndex].cards);
      const card = srcItems.find((x) => x.id === result.draggableId);

      // insert new card with destination index
      items.splice(destination.index, 0, card);
      // remove item from srcItems
      srcItems.splice(source.index, 1);

      // update state
      const firstIndex = index > srcIndex ? srcIndex : index;
      const secondIndex = index > srcIndex ? index : srcIndex;
      setTickets([
        ...tickets.slice(0, firstIndex),
        { ...tickets[firstIndex], cards: index > srcIndex ? srcItems : items },
        ...tickets.slice(firstIndex + 1, secondIndex),
        { ...tickets[secondIndex], cards: index > srcIndex ? items : srcItems },
        ...tickets.slice(secondIndex + 1),
      ]);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="Kanban">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <DroppableList
          key={uuidv4()}
          id={uuidv4()}
          title="Offen"
          cards={tickets.filter((x) => {
            return x.status === 'OPEN';
          })}
        />
        <DroppableList
          key={uuidv4()}
          id={uuidv4()}
          title="In Bearbeitung"
          cards={tickets.filter((x) => {
            return x.status === 'PROCESSING';
          })}
        />
        <DroppableList
          key={uuidv4()}
          id={uuidv4()}
          title="Erledigt"
          cards={tickets.filter((x) => {
            return x.status === 'DONE';
          })}
        />
      </DragDropContext>
    </div>
  );
}
