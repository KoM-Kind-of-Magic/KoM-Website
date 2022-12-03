import { createStore } from 'vuex';

const storeInitialState = {
  state: {
    user: {
      logged: false,
      username: '',
      email: '',
      token: '',
    },
  },
  getters: {
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setUser(context, payload) {
      context.commit('UPDATE_USER', payload);
    },
  },
  modules: {
  },
};

export default createStore(storeInitialState);
