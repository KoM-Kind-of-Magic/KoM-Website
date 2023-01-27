<template>
  <div :class="(isLoginRoute ? 'center':'')+' space-items'">
    <NavBar v-if="!isLoginRoute" />
    <router-view class="wrapped" />
  </div>
</template>

<script>
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
    $route(to, from) {
      // for now there is no route we can access when not logged
      // so we redirect to login page when not logged
      if (!this.isLoginRoute) {
        this.checkLogin();
      }
    },
  },
  methods: {
    checkLogin() {
      if (localStorage.userInfo) {
        const now = Date.now();
        const user = JSON.parse(localStorage.userInfo);
        // by default we keep user logged for 6 hours and reset for every route change
        if (user.loginDate >= now - 21600000 || user.loginKeep) {
          user.loginDate = now;
          this.$store.dispatch('setUser', user);
        } else {
          this.$router.push({ name: 'login' });
        }
      } else {
        this.$router.push({ name: 'login' });
      }
    },
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
  max-width: 1500px;
  display: flow-root;
  margin: auto;
  width: 100%;
}

.card-image {
  border-radius: 5.584% / 4%;
}
</style>
