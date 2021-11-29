import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, createStore } from 'easy-peasy';

import model from './store';
import Kanban from './layouts/Kanban';
import './index.css';

const store = createStore(model);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Kanban />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
