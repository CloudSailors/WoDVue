<template>
  <div class="inner-content">
    <b-nav align="center" id="monsterContentTypesNav">
      <b-nav-item
        v-for="(contentTypeId, idx) in monsterContentTypeIds"
        :key="`${contentTypeId}_${idx}`"
        active
        v-on:click="clickMonsterContentTypesNavItem(contentTypeId)"
      >{{ contentTypeId.text }}</b-nav-item>
    </b-nav>
    <div class="container-fluid innerMonster d-flex flex-column h-100">
      <div class="row h-100">
        <cContentList></cContentList>
        <cContentView></cContentView>
      </div>
    </div>
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
      monsterContentTypeIds: [],
    };
  },
  computed: {
    curMonster() {
      console.log('COMPUTING CUR MONSTER');
      console.dir(this.$route.params.monster);
      return this.$route.params.monster;
    },
  },
  beforeRouteEnter(to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    console.log('beforeRouteEnter');
    console.log('to');
    console.dir(to);
    console.log('from');
    console.dir(from);

    next();
  },
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log('beforeRouteUpdate');
    console.log('to');
    console.dir(to);
    console.log('from');
    console.dir(from);
    console.log(this.$route.params);

    next();
  },
  methods: {
    clickMonsterContentTypesNavItem: function clickMonsterContentTypesNavItem(
      contentTypeId,
    ) {
      this.$store.commit('updateCurContentTypeId', contentTypeId.contentTypeId);
      this.$store.commit('clearEntry');
    },
    getContentTypeIdsString: function getContentTypeIdsString() {
      const envVarKey = `VUE_APP_CONTENT_TYPE_NAV_ITEMS_${this.curMonster.toUpperCase()}`;
      const envVar = process.env[envVarKey];
      return envVar;
    },
    getContentTypeIds: function getContentTypeIds(monster) {
      return this.processContentTypeIds(this.getContentTypeIdsString(monster));
    },
    processContentTypeIds: function processContentTypeIds(contentTypesString) {
      return contentTypesString
        .split(',')
        .map((ni) => ni.split('|'))
        .map((a) => ({ text: a[0], contentTypeId: a[1] }));
    },
  },
  mounted() {
    this.monsterContentTypeIds = this.getContentTypeIds(this.curMonster);
  },
  watch: {
    curMonster(newMonster) {
      this.monsterContentTypeIds = this.getContentTypeIds(newMonster);
    },
    $route(to, from) {
      console.log('beforeRouteUpdate');
      console.log('to');
      console.dir(to);
      console.log('from');
      console.dir(from);
      console.log(this.$route.params);
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
