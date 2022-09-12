<template>
    <el-input
    v-model="inputValue"
    @input="sendInputValue"
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
  methods: {
    sendInputValue() {
      this.$emit('getInputValue', this.inputValue);
    },
  },

};
</script>

<style lang="scss">
</style>
