<template>
  <div>
    <div class="mainContent">
      <div v-if="$store.state.curContent.quote">
        {{ $store.state.curContent.quote }}
      </div>
      <div v-if="$store.state.curContent.summary">
        {{ $store.state.curContent.summary }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cDisciplineContent',
  props: {},
  components: {},
  data() {
    return {
      content: {},
    };
  },
  mounted() {
    console.log(this.$store.state.curContent);
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainContent {
  top: 1000px;
  left: 500px;
}
</style>
