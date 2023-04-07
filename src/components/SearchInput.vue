<template>
  <div class="search-wrapper">
    <Input @getInputValue="inputValue" class="search-input" placeholder="Type your Search..." />
  </div>
</template>

<script>
import Input from './Input.vue';

export default {
  name: 'SearchInput',
  components: {
    Input,
  },

  data: () => ({
    value: '',
  }),

  methods: {
    inputValue(value) {
      this.value = value;
    },
  },
};
</script>

<style lang="scss">
.search-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 50px;
}
.search-input {
  box-sizing: border-box;

  width: 105vh;
  height: 60px;

  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;

}
</style>
