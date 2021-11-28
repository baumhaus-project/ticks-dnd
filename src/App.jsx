import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import Kanban from './layouts/Kanban';
import Spinner from './components/Spinner';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { loadData } = useStoreActions((actions) => actions);

  useEffect(() => {
    loadData().then(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <Spinner /> : <Kanban />;
}
