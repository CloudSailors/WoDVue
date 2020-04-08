<template>
  <b-button-group class="mx-1">
    <b-nav-item v-on:click="showDetails()">{{ contentData.title }}</b-nav-item>
  </b-button-group>
</template>

<script>
export default {
  name: 'cContentListItem',
  props: {
    contentData: Object,
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    showDetails: function showDetails() {
      this.$store.commit('updateContent', this.contentData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
