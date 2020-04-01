<template>
  <div class="home">
    <Vampire msg="YAR" />
  </div>
</template>

<script>
// @ is an alias to /src
import Vampire from '../components/Vampire.vue';

export default {
  name: 'vVampire',
  components: {
    Vampire,
  },
};
</script>
