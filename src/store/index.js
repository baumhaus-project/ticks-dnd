/* eslint-disable no-param-reassign */
import { action } from 'easy-peasy';
import * as initData from './data.json';

const model = {
  data: initData.default,

  updateData: action((state, payload) => {
    state.data = payload;
  }),

  //   TODO: addColumn: action((state, payload) => {}),
  //   TODO: deleteColumn: action((state, payload) => {}),

  addCard: action((state, payload) => {
    const { listId, card } = payload;
    state.data.find((x) => x.id === listId).cards.push(card);
  }),
  deleteCard: action((state, payload) => {
    const { listId, cardId } = payload;
    const { cards } = state.data.find((x) => x.id === listId);
    const index = cards.findIndex((x) => x.id === cardId);

    if (index !== -1) {
      cards.splice(index, 1);
    } else {
      throw new Error('Card index search failed !');
    }
  }),
};

export default model;
