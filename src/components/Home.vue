<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'cHome',
  props: {
    msg: String,
  },
  async mounted() {
    if (!sessionStorage.first) {
      sessionStorage.first = 1;
      this.$router.push({ path: '/monsters/vampire' });
      this.$store.commit('updateCurContentTypeId', 'clans');
      await this.$store.dispatch('loadEntriesByContentTypeIdAsync', 'clans');
      this.$store.commit('updateCurEntryById', 'd6oMK1Mfpcl9f4AzYyWrf');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
