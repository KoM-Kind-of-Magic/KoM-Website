<template>
  <div>
    <el-table
      class="results-table"
      :data="results"
      style="width: 100%"
      empty-text="No Card found"
    >
      <el-table-column prop="image" label="Image">
        <div class="cont">Title</div>
        <div class="hide">
          <img src="https://www.lotusnoir.info/cartes/magic_hq/M20_/M20_220.jpg" class="result-image" alt='Image'/>
        </div>
        <!-- <template v-slot="{ row }">
          <el-popover
            placement="right"
            trigger="hover"
            title="Title"
            :width="200"
            :content="content"
          >
            <span>View</span>
            <template v-slot:content>
              <img :src="row.image" alt='Result Image' />
            </template>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="iconsets" label="Icon sets">
        <i class="ss ss-chk iconSets"></i>
        <i class="ss ss-dtk iconSets"></i>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  ElTableColumn, ElTable, ElPopover, ElButton,
} from 'element-plus';

export default {
  components: {
    'el-table-column': ElTableColumn,
    // TableSkeleton,
    'el-table': ElTable,
    // 'el-popover': ElPopover,
  },
  data() {
    return {
      results: [
        { image: '../assets/images/test.jpg', name: 'text', iconsets: 'text' },
        { image: '../assets/images/test.jpg', name: 'text', iconsets: 'text' },
        { image: '../assets/images/test.jpg', name: 'text', iconsets: 'text' },
        { image: '../assets/images/test.jpg', name: 'text', iconsets: 'text' },
        { image: '../assets/images/test.jpg', name: 'text', iconsets: 'text' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.results-table {
  margin-top: 70px;
  height: calc(100vh - 250px);
  scrollbar-width: none;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 8px;
  border-collapse: collapse;
  .el-table {
    td {
      border: 2px solid transparent !important;
    }
    th {
      background-color: rgba(196, 196, 196, 0.15) !important ;
    }
    thead {
      .el-table__cell {
        div {
          font-weight: 600;
          background-color: rgba(196, 196, 196, 0.15) !important ;
        }
      }
    }
  }
}

.iconSets {
  margin-right: 15px;
  margin-bottom: 2px;
}

.result-image {
  width: 270px;
  height: 350px;
}
.hide {
  display: none;
}

.cont:hover + .hide {
  display: block;
}
</style>
