<template>
  <div id="deckLists">
    <div class="createDeck" @click="showModal()" @keydown="c">
      Create a deck
    </div>
    <Transition>
      <CreateDeckPopIn v-show="isShow" @close="hideModal"/>
    </Transition>
    <div class="deckContainer">
    </div>
  </div>
</template>

<script>
import CreateDeckPopIn from '@/components/CreateDeckPopIn.vue';

export default {
  name: 'DeckListsView',
  components: {
    CreateDeckPopIn,
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

<style scoped>
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
  background: #ffffff22;

  border-radius: 5px;
}

.createDeck {
  position: absolute;

  right: 0;
  margin: 0 20px 0 0;
  padding: 4px 8px;
  border-radius: 20px;

  color: white;
  background: #ffffff44;
  transition: 0.3s;
}
.createDeck:hover {
  cursor: pointer;
  background: #ffffff88;
}
</style>
