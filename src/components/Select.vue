<template>
  <v-select
    class="select"
    @option:selected="sendInputValue"
    :options="options"
    :filterable="true"
    :searchable="true"
    :clearable="true"
    :close-on-select="true"
    :v-model="this.chose"
  />
</template>

<script>
import { ref, Vue } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'SelectComp',
  components: {
    'v-select': vSelect,
  },
  props: {
    options: {
      default: () => [],
      type: Array,
    },
    chose: {
      default: '',
      type: String,
    },
  },
  mounted() {
    this.selectedFormatModel = this.chose;
  },
  data() {
    return {
      selectedFormatModel: '',
    };
  },
  methods: {
    sendInputValue(val) {
      this.$emit('getInputValue', val.value);
    },
  },
  watch: {
    chose() {
      this.selectedFormatModel = this.chose;
    },
  },
};
</script>

<style lang="scss">

.select {
  width: 310px;
}

.vs__dropdown-toggle {
  background: $light-glass-background;
}
.select .vs__search::placeholder {
  color: white !important;
  font-size: 14px;
}
.select .vs__selected,
.select .vs__selected-options {
  color: $text-color;
}

.select .vs__clear svg {
  fill: $text-color;
}

.select .vs__open-indicator {
  fill: $text-color;
  transform: scale(0.9);
}

.vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(0.9);
}

.select .vs__dropdown-menu {
  background: $light-glass-background-select;
  color: $text-color;
}

.select .vs__dropdown-menu li:hover {
  background: $medium-glass-background-select;
}

</style>
