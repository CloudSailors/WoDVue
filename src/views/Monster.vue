<template>
  <div class="main-content">
    <cMonster v-if="monster" />
  </div>
</template>

<script>
import cMonster from '../components/Monster.vue';

export default {
  name: 'vMonster',
  props: {
    monster: String,
  },
  data() {
    return {};
  },
  mounted() {
    // this.$store.commit('updateMonster', this.monster);
  },
  watch: {
    $route() {
      // this.$store.commit('updateMonster', this.monster);
    },
  },
  components: {
    cMonster,
  },
};
</script>
