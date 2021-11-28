/* eslint-disable no-param-reassign */
import { action, thunk, thunkOn } from 'easy-peasy';
import { post, remove } from './requests';

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

  saveTicket: thunk(async (actions, payload) => {
    const { ticket } = payload;
    return post({
      url: `${import.meta.env.VITE_API_URL}/api/tickets`,
      payload: ticket,
    });
  }),
  deleteTicket: thunk(async (actions, payload) => {
    const { ticketId } = payload;
    return remove({
      url: `${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`,
    });
  }),

  onRequest: thunkOn(
    (actions) => [actions.saveTicket, actions.deleteTicket],
    async (actions, target) => {
      if (target.result.ok) {
        actions.loadTickets();
        // TODO: Snackbar SUCCESS
      } else {
        // TODO: Snackbar FAILURE
      }
    },
  ),
};

export default model;
