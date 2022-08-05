<template>
    <el-input
    v-model="inputValue"
    class="formInput"
    :placeholder="placeholder"
    :clearable="clearable"
    :size="size"
    @change="triggerEvent"
  />
</template>

<script>
import { ref } from 'vue';
import { ElInput } from 'element-plus';

export default {
  components: {
    'el-input': ElInput,
  },

  props: {
    value: {
      default: '',
      type: String,
    },

    placeholder: {
      default: 'Type',
      type: String,
    },

    clearable: {
      default: false,
      type: Boolean,
    },

    size: {
      default: null,
      type: String,
    },
  },

  setup() {
    const inputValue = ref('');

    return {
      inputValue,
    };
  },
};
</script>

<style lang="scss">
.formInput .el-input__wrapper{
  background: $light-glass-background-select;
  box-shadow: none;
  width: 210px;
}

.formInput .el-input__wrapper input {
  color: $text-color !important;
}
.formInput .el-input__wrapper input::placeholder {
  color: $text-color !important;
}
</style>
