<template>
  <div class="vampire">
    <b-nav align="center" id="vampNav">
      <b-nav-item
        v-for="(navItem, idx) in navItemsArray"
        :key="`${navItem}_${idx}`"
        active
        v-on:click="clickNavItem(navItem)"
        >{{ navItem }}</b-nav-item
      >
    </b-nav>
    <cDisciplinesList :curNavItem="curNavItem"></cDisciplinesList>
    <cDisciplineContent></cDisciplineContent>
  </div>
</template>

<script>
import cDisciplinesList from './disciplinesList.vue';
import cDisciplineContent from './disciplineContent.vue';

export default {
  name: 'cVampire',
  props: {
    navItems: String,
  },
  components: {
    cDisciplinesList,
    cDisciplineContent,
  },
  data() {
    return {
      navItemsArray: [],
      curNavItem: 'disciplines',
    };
  },
  mounted() {
    this.navItemsArray = this.$props.navItems.split(',');
  },
  methods: {
    clickNavItem: async function clickNavItem(navItemClicked) {
      this.curNavItem = navItemClicked.toLowerCase();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
