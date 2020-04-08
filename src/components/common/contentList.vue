<template>
  <div class="leftNav">
    <b-nav vertical>
      <div
        v-for="(parentContent, idx) in contentListData"
        :key="`parent_${idx}`"
      >
        <b-button-toolbar key-nav>
          <b-button-group class="mx-1">
            <b-button variant="outline" v-on:click="clickExpand(parentContent)"
              ><b-icon-plus-square
                v-if="!parentContent.expand"
              ></b-icon-plus-square>
              <b-icon-dash-square
                v-if="parentContent.expand"
              ></b-icon-dash-square>
            </b-button>
          </b-button-group>
          <cContentListItem :contentData="parentContent"></cContentListItem>
        </b-button-toolbar>
        <b-nav v-if="parentContent.expand" vertical>
          <cContentListItem
            v-for="(childContent, idx) in parentContent.children"
            :key="`child_${idx}`"
            :contentData="childContent"
          ></cContentListItem>
        </b-nav>
      </div>
    </b-nav>
  </div>
</template>

<script>
import apiContentful from '../../utils/api/contentful/contentful';
import cContentListItem from './contentListItem.vue';

export default {
  name: 'cContentList',
  props: {
    curNavItem: String,
  },
  data() {
    return {
      contentListData: [],
    };
  },
  mounted() {},
  methods: {
    clickExpand: function clickExpand(parentDiscipline) {
      parentDiscipline.expand = !parentDiscipline.expand;
    },
  },
  watch: {
    async curNavItem(newCurNavItem) {
      // we take the curNavItem and use it to load the requested data
      this.contentListData = await apiContentful.getContentbyTypeAsync(
        newCurNavItem,
      );
      if (!this.contentListData || this.contentListData.length === 0) {
        this.$store.commit('updateContent', null);
      }
    },
  },
  components: {
    cContentListItem,
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
