<template>
  <div>
    <div class="view-header">
      <div class="page-title">Welcome back {{userName}}</div>
    </div>
    <div class="banner">
      <img class="img" src="https://www.belloflostsouls.net/wp-content/uploads/2017/11/mtg-banner-730x280.jpg" alt="image"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HomeView',
  components: {},

  setup() {
    const currentDate = ref(new Date());
    return {
      currentDate,
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.username
        ? this.$store.state.user.username
        : this.$store.state.user.email;
    },
  },
};
</script>

<style lang="scss">
.banner {
  display: block;
  margin: auto;
  width: 730px;
}

.img {
  border-radius: 32px;
  opacity: 80%;
}

</style>
