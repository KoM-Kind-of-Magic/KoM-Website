<template>
  <!-- <el-select class="elSelect" v-model="value" effect="dark" filterable placeholder="Format">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select> -->
  <v-select
    class="select"
    placeholder="Select a Deck format"
    :options="options"
    :filterable="true"
    :searchable="true"
    :clearable="true"
    :close-on-select="true"
  >
    <!-- <option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></option> -->
  </v-select>
</template>

<script>
// import { ElSelect, ElOption } from 'element-plus';
import { ref, Vue } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'SelectComp',
  components: {
    'v-select': vSelect,
    // 'el-option': ElOption,
  },
  data() {
    return {
      value: ref(''),
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    };
  },
};
</script>

<style lang="scss">

.select {
  width: 300px;
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

.select .vs__dropdown-menu {
  background: $light-glass-background-select;
  color: $text-color;
}

.select .vs__dropdown-menu li:hover {
  background: $medium-glass-background-select;
}

</style>
