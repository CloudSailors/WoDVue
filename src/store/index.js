import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curContent: {},
    curMonster: '',
  },
  getters: {
    curContent: (state) => state.curContent,
    curMonster: (state) => state.curMonster,
  },
  mutations: {
    updateMonster(state, newMonster) {
      const monsterTypes = process.env.VUE_APP_MONSTER_TYPES.split(',');
      if (monsterTypes.findIndex((mt) => mt === newMonster) > -1) {
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
