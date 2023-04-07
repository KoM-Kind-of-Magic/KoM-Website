<template>
  <el-carousel :interval="5000">
    <el-carousel-item v-for="item in 2" :key="item">
      <h3 text="xs" justify="center">test</h3>
    </el-carousel-item>
    <el-carousel-item v-for="item in 2" :key="item">
      <h3 text="xl" justify="center">hello</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { ElCarousel } from 'element-plus';

export default {
  name: 'Caroussel',
  components: {
    'el-carousel': ElCarousel,
  },
};
</script>

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 13005px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
