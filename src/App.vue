<template>
  <div id="app">
    <div id="nav" class="navbar">
      <div class="container">
        <router-link active to="/" class="logo"></router-link>
        <router-link
          v-for="(monster, idx) in monsterTypes"
          :key="`monster_${idx}`"
          :to="`/monsters/${monster}`"
          :class="`btn-${monster}`"
        >{{ monsterNavTitles[idx] }}</router-link>
        <!-- <router-link to="/about">About</router-link> -->
      </div>
    </div>
    <router-view />

    <div id="wrapper-footer">
      <div id="menu-footer" class="navbar">
        <div class="container">
          <router-link active to="/" class="logo logoNS"></router-link>
          <router-link
            v-for="(monster, idx) in monsterTypes"
            :key="`monster_${idx}`"
            :to="`/monsters/${monster}`"
            :class="`btn-${monster}`"
          >{{ monsterNavTitles[idx] }}</router-link>
        </div>
      </div>
      <div class="footer-copyright text-center">
        <div class="container">
          <a href="https://www.bynightstudios.com/">By Night Studios</a> |
          <span>Worldofdarkness - 2020</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    monsterTypes() {
      return this.$store.getters.monsterTypes;
    },
  },
  data() {
    return {
      monsterNavTitles: process.env.VUE_APP_MONSTER_NAVTITLES.split(','),
    };
  },
  mounted() {},
};
</script>

<style lang="scss">
</style>
