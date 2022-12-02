<template>
  <div>
    <div class="container">
      <img src="@/assets/images/logo.png" alt="logo" class="logo"/>
      <SearchInput class="search" />
    </div>
    <div class="filter-container">
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
        <el-checkbox class="check" v-model="checked2">checkbox</el-checkbox>
        <el-checkbox class="check" v-model="checked2">checkbox</el-checkbox>
      </div>
      <span class="vertical-line" />
    </div>
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
  place-items: center;
  grid-template-areas: "inner-div";
  margin-top: -45px;
}

.filterComp {
  box-sizing: border-box;

  position: absolute;
  width: 105vh;
  height: 376px;
  left: 485px;
  top: 440px;

  background: rgba(196, 196, 196, 0.15);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

.searchText {
  font-family: 'Radley';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  text-align: center;

  color: rgba(255, 255, 255, 0.8);
}

.checkContainer {
  position: absolute;
  left: 57vh;
  top: 68vh;
}

 .vertical-line{
  display: inline-block;
  border-left: 2.5px solid #ccc;
  margin: 0 10px;
  height: 29vh;
  opacity: 0.3;
  margin-left: 52vh;
  position: absolute;
  left: 55vh;
  top: 55vh;
}

.filter {
  padding: 25px;
}

.logo {
  grid-area: inner-div;
}
</style>
