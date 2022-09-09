<template>
  <div id="home">
    <div class="banner">
      <img class="img" src="https://www.belloflostsouls.net/wp-content/uploads/2017/11/mtg-banner-730x280.jpg" alt="image"/>
    </div>
    <div class="container">
      <el-row>
        <el-col
          v-for="(i, index) in 4"
          :key="i"
          :span="8"
          :offset="index > 0 ? 4 : 0"
        >
          <el-card class="card">
            <img
              src="https://images.ctfassets.net/s5n2t79q9icq/2IhViaXxBNa2EgOUyg7W0T/6d4e335b68c453f1525c0cbcc35989b1/waystoplay-arena_0.jpg?w=500&fm=webp"
              class="image"
              alt="image"
            />
            <div style="padding: 14px">
              <span style="color: white">News</span>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">More</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElCard, ElButton } from 'element-plus';

export default {
  name: 'HomeView',
  components: {
    'el-card': ElCard,
    'el-button': ElButton,
  },

  setup() {
    const currentDate = ref(new Date());
    return {
      currentDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 750px;
  height: 200px;
}

.container {
  display: block;
  width: 100%;
  padding-top: 150px;
  margin-right: 15px;
}
.card {
  background: rgb(39, 51, 89, 0.4);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border: 0;
  float: left;
  margin: 10px;
  padding: 10px 3px;
  width: calc( 100% / 5 - 10px);
}

.container .card:first-child {
  margin-left: 55px !important;
}

.container .card:nth-child(4n) {
  margin-right: 0;
}

.img {
  border-radius: 32px;
  opacity: 80%;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

</style>
