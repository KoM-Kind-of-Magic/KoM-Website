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
  background-image:
    radial-gradient(at 0% 0%, hsla(339,49%,30%,1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(253,16%,7%,1) 0, transparent 50%),
}
</style>
