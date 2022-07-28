<template>
  <div class="w-button relative">
    <el-button v-bind="attrs" @click="onClick($event)">
      <slot />
    </el-button>
  </div>
</template>

<script>
import { ElButton } from 'element-plus';

export default {
  name: 'Button',

  components: {
    'el-button': ElButton,
  },

  props: {
    type: {
      type: String,
      default: 'default',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: '',
    },

    icon: {
      type: Boolean,
      default: false,
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
