<template>
  <div id="app">
    <header>
      <NavbarItem/>
    </header>
  </div>
</template>

<script>
import NavbarItem from './layouts/components/NavbarItem.vue';

export default {
  name: 'app',
  components: {
    NavbarItem,
  },
};
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%; // add this rule
}

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  background-color:#0f0e13;
  background-image:
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);

}
</style>
