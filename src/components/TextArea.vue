<template>
    <el-input
    v-model="inputValue"
    class="formInput"
    :placeholder="placeholder"
    maxlength="140"
    show-word-limit
    type="textarea"
    :rows='4'
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
.formInput .el-textarea__inner{
  background: $light-glass-background-select;
  box-shadow: none;
  width: 300px;
  color: $text-color;
  padding: 10px;
  max-height: 150px;
}

.formInput .el-input__count {
  background: transparent;
}
</style>
