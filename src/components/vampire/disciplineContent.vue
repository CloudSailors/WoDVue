<template>
  <div>
    <span class="mainContent">
      <div v-if="$store.state.curContent.title">
        <span style="font-weight:bold">Discipline: </span>
        {{ $store.state.curContent.title }}
      </div>
      <div
        v-if="
          !$store.state.curContent.children && $store.state.curContent.power
        "
      >
        <span style="font-weight:bold">Power: </span
        >{{ $store.state.curContent.power }}
      </div>
      <div v-if="$store.state.curContent.level">
        <span style="font-weight:bold">Level: </span>
        {{ $store.state.curContent.level }}
      </div>
      <div v-if="$store.state.curContent.quote">
        <span style="font-weight:bold">Quote: </span
        >{{ $store.state.curContent.quote }}
      </div>
      <div v-if="$store.state.curContent.summary">
        <span style="font-weight:bold">Summary: </span
        >{{ $store.state.curContent.summary }}
      </div>
      <div v-if="$store.state.curContent.testPool">
        <span style="font-weight:bold">TestPool: </span
        >{{ $store.state.curContent.testPool }}
      </div>
      <div v-if="$store.state.curContent.cost">
        <span style="font-weight:bold">Cost: </span
        >{{ $store.state.curContent.cost }}
      </div>
      <div v-if="$store.state.curContent.errata">
        <span style="font-weight:bold">Errata: </span
        >{{ $store.state.curContent.errata }}
      </div>
      <div v-if="$store.state.curContent.exceptionalLong">
        <span style="font-weight:bold">Exceptional: </span
        >{{ $store.state.curContent.exceptionalLong }}
      </div>
      <div v-if="$store.state.curContent.foci">
        <span style="font-weight:bold">Foci: </span
        >{{ $store.state.curContent.foci }}
      </div>
      <div v-if="$store.state.curContent.focusDescriptor">
        <span style="font-weight:bold">Description: </span
        >{{ $store.state.curContent.focusDescriptor }}
      </div>
    </span>
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
.mainContent {
  display: inline-block;
  width: 500px;
}
</style>
