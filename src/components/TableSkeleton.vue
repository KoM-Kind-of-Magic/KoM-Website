<template>
  <div class="kf-table-skeleton">
    <el-table
      ref="tableSkeleton"
      header-cell-class-name="my-header"
      :max-height="maxHeight"
      highlight-current-row
      :empty-text="emptyText"
      style="width: 100%"
      element-loading-text="Loading"
      :stripe="stripe"
    >
      <slot />
    </el-table>
  </div>
</template>

<script>
import { ElTable } from 'element-plus';

export default ({

  components: {
    'el-table': ElTable,
  },

  props: {
    data: {
      default: () => ([]),
      type: Array,
    },

    height: {
      default: '100%',
      type: String,
    },

    rowClassName: {
      default: () => () => {},
      type: Function,
    },

    emptyText: {
      default: null,
      type: String,
    },

    maxHeight: {
      default: null,
      type: [String, Number],
    },

    stripe: {
      default: false,
      type: Boolean,
    },
  },

  emits: ['selection-change'],

});

</script>
