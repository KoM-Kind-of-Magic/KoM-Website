<template>
  <div :class="(isLoginRoute ? 'center':'')+' space-items'">
    <NavBar v-if="!isLoginRoute" />
    <router-view class="wrapped" />
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './layouts/components/NavBar/Navbar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
  },
  data() {
    return {
      loginRoutes: ['login', 'register'],
    };
  },
  computed: {
    isLoginRoute() {
      return this.loginRoutes.includes(this.$route.name);
    },
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%; // add this rule
}

body {
  margin: 0;
  font-family: "Ubuntu" !important;
  background-color: $app-background-color;
}

body {
  overflow: overlay;
}

.view-header {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: space-between;

  & .page-title {
    font-size: 32px;
  }
  & .sub-btns-title {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 12px;
    align-self: end;

    & .button-title {
      display: flex;
      padding: 6px 12px;
      border-radius: 16px;
      color: white;
      background: rgba(255, 255, 255, 0.3);
      transition: 0.3s;
      align-self: center;
      &:hover {
        cursor: pointer;
        background: $strong-glass-background;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: #822a4a;
}

::-webkit-scrollbar-track {
  background: transparent;
}

input {
  font-family: inherit;
}

.space-items {
  display: grid;
  gap: 24px;
  &.center {
    height: inherit;
    align-items: center;
  }
}

.wrapped {
  display: flow-root;
  // margin: auto;
  width: auto;
  // padding: 0 350px;
}

.card-image {
  border-radius: 5.584% / 4%;
  width: 100%;
}
</style>
