<template>
  <div>
    <b-nav align="center" id="monsterTopNav">
      <b-nav-item
        v-for="(navItem, idx) in topNavItems"
        :key="`${navItem}_${idx}`"
        active
        v-on:click="clickNavItem(navItem)"
        >{{ navItem.text }}</b-nav-item
      >
    </b-nav>
    <cContentList :curNavItem="curTopNavItem"></cContentList>
    <cContentView></cContentView>
  </div>
</template>

<script>
import cContentList from './common/contentList.vue';
import cContentView from './common/contentView.vue';

export default {
  name: 'cMonster',
  props: {},
  data() {
    return {
      topNavItems: [],
      curTopNavItem: {},
    };
  },
  computed: {
    curMonster() {
      return this.$store.getters.curMonster;
    },
  },
  mounted() {
    if (this.curMonster) {
      const envName = `VUE_APP_${this.curMonster.toUpperCase()}_TOPNAVITEMS`;
      this.topNavItems = this.processNavItems(process.env[envName]);
    }
  },
  methods: {
    clickNavItem: function clickNavItem(navItemClicked) {
      this.curTopNavItem = navItemClicked;
    },
    processNavItems: function processNavItems(navItemsString) {
      return navItemsString
        .split(',')
        .map((ni) => ni.split('|'))
        .map((a) => ({ text: a[0], contentType: a[1] }));
    },
  },
  watch: {
    curMonster(newMonster) {
      const envName = `VUE_APP_${newMonster.toUpperCase()}_TOPNAVITEMS`;
      this.topNavItems = this.processNavItems(process.env[envName]);
    },
  },
  components: {
    cContentList,
    cContentView,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
