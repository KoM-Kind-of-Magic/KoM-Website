<template>
  <div class="content">
    coucou
    <div class="test" ref="ehoh"></div>
    <plotly :data="data" :layout="layout" :display-mode-bar="false"></plotly>
  </div>
</template>

<script>
import { plotly } from 'vue-plotly';

export default {
  name: 'DeckStatView',
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    sortByTypes: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    plotly,
  },
  computed: {
    averageCMC() {
      const cmcs = this.cards.map((c) => c.convertedManaCost);
      const sum = cmcs.reduce((a, b) => a + b, 0);
      const avg = (sum / cmcs.length) || 0;
      return Math.round(avg * 100) / 100;
    },
  },
  mounted() {
    console.log(this.cards);
    console.log(this.sortByTypes);
    console.log(this.averageCMC);
  },
  data() {
    return {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: 'scatter',
        },
      ],
      layout: {
        title: 'My graph',
      },
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
