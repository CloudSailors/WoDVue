<template>
  <div>
    <div class="mainContent">
      <div v-if="$store.state.curContent.title">
        Discipline: {{ $store.state.curContent.title }}
      </div>
      <div
        v-if="
          !$store.state.curContent.children && $store.state.curContent.power
        "
      >
        Power: {{ $store.state.curContent.power }}
      </div>
      <div v-if="$store.state.curContent.level">
        Level: {{ $store.state.curContent.level }}
      </div>
      <div v-if="$store.state.curContent.quote">
        Quote: {{ $store.state.curContent.quote }}
      </div>
      <div v-if="$store.state.curContent.summary">
        Summary: {{ $store.state.curContent.summary }}
      </div>
      <div v-if="$store.state.curContent.testPool">
        TestPool: {{ $store.state.curContent.testPool }}
      </div>
      <div v-if="$store.state.curContent.cost">
        Cost: {{ $store.state.curContent.cost }}
      </div>
      <div v-if="$store.state.curContent.errata">
        Errata: {{ $store.state.curContent.errata }}
      </div>
      <div v-if="$store.state.curContent.exceptionalLong">
        Exceptional: {{ $store.state.curContent.exceptionalLong }}
      </div>
      <div v-if="$store.state.curContent.foci">
        Foci: {{ $store.state.curContent.foci }}
      </div>
      <div v-if="$store.state.curContent.focusDescriptor">
        Description: {{ $store.state.curContent.focusDescriptor }}
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
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .mainContent {
//   top: 1000px;
//   left: 700px;
// }
</style>
