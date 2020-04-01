<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <cHome msg="Welcome To One World Of Darkness Bob"></cHome>
  </div>
</template>

<script>
// @ is an alias to /src
import cHome from '../components/Home.vue';

export default {
  name: 'Home',
  components: {
    cHome,
  },
};
</script>
