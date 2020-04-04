<template>
  <b-button-group class="mx-1">
    <b-nav-item v-on:click="showDetails()">{{
      disciplineObj.title
    }}</b-nav-item>
  </b-button-group>
</template>

<script>
export default {
  name: 'cDisciplineListItem',
  props: {
    disciplineObj: Object,
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    showDetails: function showDetails() {
      // console.log(`showDetails for ${this.disciplineObj.title}`);
      this.$store.commit('updateContent', this.disciplineObj);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
