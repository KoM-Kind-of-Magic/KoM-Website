<template>
  <div class="popInBackground" @click.self="closeModal" @keydown="c">
    <div id="PopIn">
      <div class="title">{{title}}</div>
      <div class="closeModal" @click="closeModal" @keydown="c">
        <fa class="icon" icon="xmark" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopIn',
  props: {
    title: { type: String, required: false },
  },
  data() {
    return {};
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

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  background: #00000044;
}

#PopIn {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  background: #151823;

  border-radius: 10px;

  width: 400px;

  z-index: 3;

  top: 200px;

  & .title {
    color: $text-color;
    text-align: center;
    width: fit-content;
    margin: 15px 0 30px 0;
    font-size: 18px;
    padding: 5px 10px;
    cursor: default;

    &::after {
      content: '';
      width: 100px;
      height: 3px;
      display: block;
      margin: 5px auto;

      background: $title-underline-color;
    }
  }

  & .closeModal {
    position: absolute;
    cursor: pointer;
    right: 0;
    max-width: 20px;
    max-height: 20px;
    padding: 6px;
    border-radius: 10px;
    background: $light-glass-background;
    transition: 0.3s;

    & .icon {
      width: 20px;
      height: 20px;
      color: $text-color;
    }
    &:hover {
      background: $medium-glass-background;
    }
  }
}
</style>
