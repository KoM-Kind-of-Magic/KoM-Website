<template>
  <nav>
    <Logo />
    <NavBarLink class="item" to="/" icon="home">Home</NavBarLink>
    <NavBarLink class="item" to="/deckLists" icon="clone">My Decks</NavBarLink>
    <NavBarLink class="item" to="/search" icon="search">Search</NavBarLink>
    <NavBarLink class="item" to="/wip" icon="gear">WIP</NavBarLink>
  </nav>
</template>

<script>
import NavBarLink from './NavBarLink.vue';
import Logo from '../Logo.vue';

export default {
  name: 'NavBar',
  components: { NavBarLink, Logo },

  methods: {
    showModal() {
      this.isShow = true;
    },
    hideModal() {
      this.isShow = false;
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height:95px;

  background-color: rgb(107,38,63);
  background-image:
    linear-gradient(90deg, rgb(96, 35, 57) 0%, rgb(21, 24, 35) 100%);
}
</style>
