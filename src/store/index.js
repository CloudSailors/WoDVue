import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curContent: {},
  },
  getters: {
    curContent: (state) => state.curContent,
  },
  mutations: {
    updateContent(state, newContent) {
      console.dir(newContent);
      state.curContent = newContent;
    },
  },
  actions: {},
  modules: {},
});
