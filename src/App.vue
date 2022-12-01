<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './layouts/components/NavBar/Navbar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
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
  background-color:#0f0e13;
  background-image: linear-gradient(90deg, rgb(96, 35, 57) 0%, rgb(21, 24, 35) 100%);
  // background-image: url("@/assets/images/background.png");
  // background-size: cover;
}

input {
  font-family: inherit;
}
</style>
