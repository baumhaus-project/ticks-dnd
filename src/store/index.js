/* eslint-disable no-param-reassign */
import { action, thunk, thunkOn } from 'easy-peasy';
import { post, put, remove } from './requests';

const model = {
  tickets: [],
  persons: [],

  setPersons: action((state, payload) => {
    state.persons = payload;
  }),
  loadPersons: thunk(async (actions) => {
    return fetch(`${import.meta.env.VITE_API_URL}/api/persons`)
      .then((res) => res.json())
      .then((res) => actions.setPersons(res));
  }),

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
  editTicket: thunk(async (actions, payload) => {
    const { ticket } = payload;
    return put({
      url: `${import.meta.env.VITE_API_URL}/api/tickets/${ticket.id}`,
      payload: ticket,
    });
  }),
  deleteTicket: thunk(async (actions, payload) => {
    return remove({
      url: `${import.meta.env.VITE_API_URL}/api/tickets/${payload}`,
    });
  }),

  onRequest: thunkOn(
    (actions) => [actions.saveTicket, actions.editTicket, actions.deleteTicket],
    async (actions, target) => {
      actions.loadTickets();
      if (target.result.ok) {
        // TODO: Snackbar SUCCESS
      } else {
        // TODO: Snackbar FAILURE
      }
    },
  ),
};

export default model;
