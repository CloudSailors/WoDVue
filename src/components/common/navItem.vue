<template>
  <nav>{{ title }}</nav>
</template>

<script>
export default {
  name: 'cNavItem',
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  padding-right: 5px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
