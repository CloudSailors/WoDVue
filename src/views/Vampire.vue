<template>
  <div class="home">
    <cVampire :navItems="data.vampireNavItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import cVampire from '../components/vampire/Vampire.vue';

export default {
  name: 'vVampire',
  data() {
    return {
      data: {
        vampireNavItems: process.env.VUE_APP_VAMPIRE_NAVITEMS,
      },
    };
  },
  components: {
    cVampire,
  },
};
</script>
