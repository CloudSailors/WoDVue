<template>
  <span class="mainContent">
    <div v-for="(item, idx) in displayContent" :key="`content_${idx}`">
      <span style="font-weight:bold">{{ item.displayLabel }}: </span>
      <span v-if="helpers.typeOf(item.value) !== 'array'">{{
        item.value
      }}</span>
      <p v-else v-for="(subItem, idx) in item.value" :key="`subItem_${idx}`">
        {{ subItem }}
      </p>
    </div>
    <!-- <p v-for="(item, idx) in displayContent" :key="`content_${idx}`">
      <span style="font-weight:bold">{{ item.displayLabel }}: </span>
      {{ item.value }}
    </p> -->
  </span>
</template>

<script>
import helpers from '../../utils/helpers/helpers';

export default {
  name: 'cContentView',
  props: {},
  components: {},
  data() {
    return {
      displayContent: [],
      noContent: [{ displayLabel: 'My Apologies', value: 'No content yet' }],
      helpers,
    };
  },
  computed: {
    curContent() {
      const { curContent } = this.$store.getters;
      return curContent;
    },
  },
  mounted() {},
  methods: {
    processContent(content) {
      const { curMonster } = this.$store.getters;
      const { contentTypeId } = content;
      const displayContentMapName = `VUE_APP_${curMonster.toUpperCase()}_DISPLAY_CONTENT_MAP_${contentTypeId.toUpperCase()}`;
      const displayContentMapStr = process.env[displayContentMapName];
      const displayContent = displayContentMapStr.split(',').map((dcp) => {
        const dcpAry = dcp.split('|');
        const [displayLabel, contentField] = dcpAry;
        const dcpObj = {
          displayLabel,
          value: content[contentField],
        };
        return dcpObj;
      });
      return displayContent;
    },
  },
  watch: {
    curContent(newContent) {
      this.displayContent = newContent
        ? this.processContent(newContent)
        : this.noContent;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainContent {
  display: inline-block;
  width: 500px;
}
</style>
