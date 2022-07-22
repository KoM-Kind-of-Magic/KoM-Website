<template>
  <div class="popInBackground" @click.self="closeModal" @keydown="c">
    <div id="createDeckPopIn">
      <div class="title">Create a new deck</div>
      <div class="closeModal" @click="closeModal" @keydown="c">
        <fa class="icon" icon="xmark" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateDeckPopIn',
  components: {
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

<style lang="scss" scoped>
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
  background: black;

  border-radius: 10px;

  width: 33%;
  min-width: 300px;
  max-width: 500px;

  height: 40%;
  min-height: 300px;
  max-height: 500px;

  z-index: 3;

  top: 200px;
}

.title {
  color: $text-color;
  text-align: center;
  width: fit-content;
  margin: 15px 0 0 0;
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

.closeModal:hover {
  background: $medium-glass-background;
}
</style>
