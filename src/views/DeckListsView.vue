<template>
  <div id="deckLists">
    <div class="createDeck" @click="showModal()" @keydown="c">
      Create a deck
    </div>
    <Transition>
      <CreateDeckPopIn v-show="isShow" @close="hideModal"/>
    </Transition>
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
              src="http://media.wizards.com/2016/bVvMNuiu2i_KLD/en_g2UfOun34M.png"
              class="image"
              alt="image"
            />
            <div style="padding: 14px">
              <span style="color: white">Deck</span>
              <div class="bottom">
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
import CreateDeckPopIn from '@/components/CreateDeckPopIn.vue';
import { ElCard, ElButton } from 'element-plus';

export default {
  name: 'DeckListsView',
  components: {
    CreateDeckPopIn,
    'el-card': ElCard,
    'el-button': ElButton,
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
  padding: 4px 8px;
  border-radius: 5px;

  color: $text-color;
  background: $medium-glass-background;
  transition: 0.3s;
}
.createDeck:hover {
  cursor: pointer;
  background: $strong-glass-background;
}
</style>