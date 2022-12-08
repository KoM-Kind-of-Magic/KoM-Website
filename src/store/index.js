import { createStore } from 'vuex';

const storeInitialState = {
  state: {
    user: {
      logged: false,
      loginDate: '',
      loginKeep: false,
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
    SIGNOUT_USER(state) {
      state.user = storeInitialState.state.user;
    },
  },
  actions: {
    setUser(context, payload) {
      context.commit('UPDATE_USER', payload);
    },
    signOutUser(context) {
      context.commit('SIGNOUT_USER');
    },
  },
  modules: {
  },
};

export default createStore(storeInitialState);
