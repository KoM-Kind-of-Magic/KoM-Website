<template>
   <div class="popInBackground" @click.self="closeModal" @keydown="c">
    <div id="createDeckPopIn">
      <div class="title">Login</div>
      <div class="closeModal" @click="closeModal" @keydown="c">
        <fa class="icon" icon="xmark" />
      </div>
      <div class="input">
        <Input
          @getInputValue="setDeckName"
          placeholder="Email"
          class="name_input"
        />
      </div>
      <div class="input">
        <Input
          id="formatSelect"
          placeholder="Password"
          @getInputValue="setDeckFormat"
        />
      </div>
      <Button class="createDeckBtn" @click="createDeck()">Login</Button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';

export default {
  components: {
    Input,
  },

  created() {
    document.addEventListener('keyup', this.closeModalOnEscPress);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    closeModalOnEscPress(event) {
      if (event.keyCode === 27) {
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="scss">
.popInBackground {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  background: #00000044;
}

#createDeckPopIn {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  background: #151823;

  border-radius: 10px;

  width: 400px;
  height: 300px;

  z-index: 3;

  top: 200px;
}

.title {
  color: $text-color;
  text-align: center;
  width: fit-content;
  margin: 15px 0 30px 0;
  font-size: 18px;
  padding: 5px 10px;
  cursor: default;
}
.title::after {
  content: '';
  border-bottom: 3px solid $title-underline-color;
  width: 100px;
  display: block;
  margin: 5px auto;
}

.closeModal .icon {
  width: 20px;
  height: 20px;
  color: $text-color;
}

.closeModal {
  position: absolute;
  cursor: pointer;
  right: 0;
  max-width: 20px;
  max-height: 20px;
  padding: 6px;
  border-radius: 10px;
  background: $light-glass-background;
  transition: 0.3s;
}
.input {
  margin-bottom: 20px;
}
.closeModal:hover {
  background: $medium-glass-background;
}
</style>
