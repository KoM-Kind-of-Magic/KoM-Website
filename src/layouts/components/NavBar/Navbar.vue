<template>
  <nav>
    <NavBarLink class="item" to="/" icon="home">Home</NavBarLink>
    <NavBarLink class="item" to="/deckLists" icon="clone">My Decks</NavBarLink>
    <NavBarLink class="item" to="/wip" icon="gear">WIP</NavBarLink>
    <NavBarLink class="item" to="/wip" icon="gear">WIP</NavBarLink>
  </nav>
</template>

<script>
import NavBarLink from './NavBarLink.vue';

export default {
  name: 'NavBar',
  components: { NavBarLink },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(107,38,63);
  background-image:
    linear-gradient(140deg, rgba(107,38,63,1) 0%, rgba(28,5,68,1) 50%, rgba(0,0,0,1) 100%);
}
</style>
