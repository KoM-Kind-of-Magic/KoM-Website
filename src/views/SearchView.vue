<template>
  <div class="background-section">
    <div class="container">
      <SearchInput class="search" />
    </div>
    <div class="filter-cont">
      <div class="filterComp">
        <SelectComp
          class="filter"
          id="typeFilter"
          placeholder="Select a type  "
          @getInputValue="setFilter"
        />
        <SelectComp
          class="filter"
          id="typeFilter"
          placeholder="Select a type  "
          @getInputValue="setFilter"
        />
      </div>
      <div class="checkContainer">
        <div class="checkComp">
          <el-checkbox class="check" v-model="checked1">checkbox</el-checkbox>
          <el-checkbox class="check" v-model="checked2">checkbox</el-checkbox>
        </div>
        <div class="checkComp2">
          <el-checkbox class="check" v-model="checked1">
            <i class="ss ss-jou iconFilter"></i>
          </el-checkbox>
          <el-checkbox class="check" v-model="checked2">
            <i class="ss ss-bok iconFilter"></i>
          </el-checkbox>
        </div>
      </div>
    </div>
    <span class="vertical-line" />
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue';
import SelectComp from '@/components/Select.vue';
import { ElCheckbox } from 'element-plus';

export default {
  components: {
    SearchInput,
    SelectComp,
    'el-checkbox': ElCheckbox,
  },
  data: () => ({
    types: '',
  }),
  methods: {
    setFilter(types) {
      this.types = types;
    },
  },
};
</script>

<style lang="scss">
.container {
  /* important part */
  display: grid;
  grid-template-areas: "inner-div";
  margin-top: 0;
}
.filter-cont {
  position: absolute;
  width: 125vh;
  height: 250px;
  left: 420px;
  top: 280px;
  background: rgba(196, 196, 196, 0.15);
  border-radius: 8px;
}
.filterComp {
  margin-top: 60px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .filter {
    width: 46vh;
  }
}
.checkContainer {
  position: absolute;
  width: 46vh;
  height: 110px;
  left: 72vh;
  top: 54px;
  background: rgba(196, 196, 196, 0.15);
  border-radius: 8px;
  .checkComp {
    margin-left: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .checkComp2 {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: absolute;
    top: 10px;
    left: 210px;
  }
  .el-checkbox__inner {
    border-color: #fff;
  }
  .iconFilter {
    margin-bottom: 2px;
  }
}
.vertical-line{
  display: inline-block;
  border-left: 2.5px solid #ccc;
  margin: 0 10px;
  height: 20vh;
  opacity: 0.3;
  position: absolute;
  left: 111vh;
  top: 36vh;
}
</style>
