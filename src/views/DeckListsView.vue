<template>
  <div id="deckLists">
    <div class="createDeck" @click="showModal()" @keydown="c">
      <Plus class="deckIcon"/>Create a deck
    </div>
    <Transition>
      <CreateDeckPopIn v-show="isShow" @close="hideModal"/>
    </Transition>
     <div class="container" style="height: 70vh; overflow-y: auto; overflow-x: hidden">
      <el-row>
        <el-col
          v-for="(i, index) in 8"
          :key="i"
          :span="8"
          :offset="index > 0 ? 8 : 0"
        >
          <el-card class="card">
            <img
              src="https://magicalter.com/wp-content/uploads/revslider/beforeafterslider1-1/before-after-1.png"
              class="image"
              alt="image"
            />
            <div style="padding: 14px">
              <span style="color: white; font-weight: 900;">Deck</span>
              <div class="bottom">
                <el-button :icon="Edit" type="info" circle><Plus class="icon"/></el-button>
                <el-button class="delete-btn" type="warning" :icon="Delete" circle>
                  <Star class="icon" />
                </el-button>
                <el-button type="danger" :icon="Star" circle><Delete class="icon" /></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CreateDeckPopIn from '@/components/CreateDeckPopIn.vue';
import { Star, Plus, Delete } from '@element-plus/icons-vue';
import { ElCard, ElButton } from 'element-plus';

export default {
  name: 'DeckListsView',
  components: {
    CreateDeckPopIn,
    'el-card': ElCard,
    'el-button': ElButton,
    Star,
    Plus,
    Delete,
  },
  methods: {
    showModal() {
      this.isShow = true;
    },
    hideModal() {
      this.isShow = false;
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#deckLists {
  display: flex;
  align-content: center;
  justify-content: center;

  margin-top: 20px;
}
.deckContainer {
  height: 500px;
  width: 100%;
  position: relative;

  margin: 35px 20px;
  padding: 20px;

  box-shadow: 20px 50px 50px rgba(0, 0, 0, 0.5);
  background: $light-glass-background;

  border-radius: 5px;
}

.createDeck {
  position: absolute;

  right: 0;
  margin: 0 20px 0 0;
  padding: 6px 12px;
  border-radius: 16px;

  color: $text-color;
  background: $medium-glass-background;
  transition: 0.3s;
}
.createDeck:hover {
  cursor: pointer;
  background: $strong-glass-background;
}
.card {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.card:hover {
  background: $medium-glass-background;
  -webkit-transition: .3s;
  transition: .3s
}
.icon {
  height: 16px;
  width: 16px;
}
.delete-btn {
  margin-left: 10rem;
}
.deckIcon {
  height: 14px;
  width: 14px;
  position: relative;
  top: 0.5px;
  margin-right: 3px;
}
</style>
