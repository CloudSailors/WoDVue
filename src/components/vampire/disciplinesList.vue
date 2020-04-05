<template>
  <div class="leftNav">
    <b-nav vertical v-if="curNavItem === 'disciplines'">
      <div v-for="(parentDiscipline, idx) in disciplineData" :key="idx">
        <b-button-toolbar key-nav>
          <b-button-group class="mx-1">
            <b-button
              variant="outline"
              v-on:click="clickExpand(parentDiscipline)"
              ><b-icon-plus-square
                v-if="!parentDiscipline.expand"
              ></b-icon-plus-square>
              <b-icon-dash-square
                v-if="parentDiscipline.expand"
              ></b-icon-dash-square>
            </b-button>
          </b-button-group>
          <cDisciplineListItem
            :disciplineObj="parentDiscipline"
          ></cDisciplineListItem>
        </b-button-toolbar>
        <b-nav v-if="parentDiscipline.expand" vertical>
          <cDisciplineListItem
            v-for="(childDiscipline, idx) in parentDiscipline.children"
            :key="`childDisc_${idx}`"
            :disciplineObj="childDiscipline"
          ></cDisciplineListItem>
        </b-nav>
      </div>
    </b-nav>
  </div>
</template>

<script>
import apiContentful from '../../utils/api/contentful/contentful';
import cDisciplineListItem from './disciplineListItem.vue';

export default {
  name: 'cDisciplinesList',
  props: {
    curNavItem: String,
  },
  components: {
    cDisciplineListItem,
  },
  data() {
    return {
      disciplineData: [],
    };
  },
  async mounted() {
    this.disciplineData = await apiContentful.getDisciplinesData();
  },
  methods: {
    clickExpand: function clickExpand(parentDiscipline) {
      parentDiscipline.expand = !parentDiscipline.expand;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.leftNav {
  position: fixed;
  left: 0;
  height: 100%;
  overflow: auto;
}
</style>
