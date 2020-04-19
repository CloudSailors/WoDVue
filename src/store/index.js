import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monsterTypes: process.env.VUE_APP_MONSTER_TYPES.split(','),
    curContent: {},
    curMonster: '',
  },
  getters: {
    monsterTypes: (state) => state.monsterTypes,
    curContent: (state) => state.curContent,
    curMonster: (state) => state.curMonster,
  },
  mutations: {
    updateMonster(state, newMonster) {
      if (state.monsterTypes.findIndex((mt) => mt === newMonster) > -1) {
        state.curMonster = newMonster;
      }
    },
    updateContent(state, newContent) {
      state.curContent = newContent;
    },
  },
  actions: {},
  modules: {},
});
