<template>
  <div class="main-content home">
    <div class="container">
      <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
      <cHome class="welcome" msg="Welcome"></cHome>
      <b-button href="#" variant="primary">Learn More</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import cHome from '../components/Home.vue';

export default {
  name: 'vHome',
  components: {
    cHome,
  },
};
</script>
