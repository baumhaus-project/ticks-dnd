import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import Kanban from './layouts/Kanban';

export default function App() {
  const { loadData } = useStoreActions((actions) => actions);

  useEffect(() => {
    loadData();
  });

  return <Kanban />;
}
