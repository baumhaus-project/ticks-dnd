/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { action, thunk } from 'easy-peasy';
// import { post, put, remove } from './requests';

const model = {
  tickets: [],
  persons: [],

  setTickets: action((state, payload) => {
    state.tickets = payload;
  }),

  loadTickets: thunk(async (actions) => {
    return fetch(`${import.meta.env.VITE_API_URL}/api/tickets`)
      .then((res) => res.json())
      .then((res) => actions.setTickets(res));
  }),

  addCard: action((state, payload) => {
    // const { listId, card } = payload;
    // state.data.find((x) => x.id === listId).cards.push(card);
  }),
  deleteCard: action((state, payload) => {
    // const { listId, cardId } = payload;
    // const { cards } = state.data.find((x) => x.id === listId);
    // const index = cards.findIndex((x) => x.id === cardId);
    // if (index !== -1) {
    //   cards.splice(index, 1);
    // } else {
    //   throw new Error('Card index search failed !');
    // }
  }),
};

export default model;
