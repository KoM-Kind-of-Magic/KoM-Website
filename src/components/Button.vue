<template>
    <button>
      <slot />
      <div class="iconBackground">
        <fa class="icon" icon="arrow-right-long" />
      </div>
    </button>
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
 button {
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

 button .iconBackground {
  background: $medium-glass-background;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  display: flex;
  justify-content: center;

  margin: 0 0 0 20px;
}

 button .icon {
  color: $text-color;
  margin: auto 0;
  transform: translateX(-8px);
  transition: 0.2s;
}

 button:hover .icon {
  transform: translateY(0);
}

 button:hover {
  background: #822a4a;
}

</style>
