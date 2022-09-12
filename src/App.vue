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
  font-family: "Ubuntu";
  background-color:#0f0e13;
  background-image: linear-gradient(90deg, rgba(96,35,57,1) 0%, rgba(16,16,22,1) 100%);
}
</style>
