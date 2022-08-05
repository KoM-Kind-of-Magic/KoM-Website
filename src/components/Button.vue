<template>
  <div class="validateForm">
    <button v-bind="attrs" @click="onClick($event)">
      <slot />
      <div class="iconBackground">
        <fa class="icon" icon="arrow-right-long" />
      </div>
    </button>
  </div>
</template>

<script>

export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'default',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: '',
    },

    icon: {
      type: Boolean,
      default: false,
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.validateForm {
  position: absolute;
  bottom: 35px;
}

.validateForm button {
  background: $primary-color;
  color: $text-color;
  padding: 7px 16px;
  border-radius: 12px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: 0.2s;

  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.validateForm button .iconBackground {
  background: $medium-glass-background;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  display: flex;
  justify-content: center;

  margin: 0 0 0 20px;
}

.validateForm button .icon {
  color: $text-color;
  margin: auto 0;
  transform: translateX(-8px);
  transition: 0.2s;
}

.validateForm button:hover .icon {
  transform: translateY(0);
}

.validateForm button:hover {
  background: #822a4a;
}

</style>
