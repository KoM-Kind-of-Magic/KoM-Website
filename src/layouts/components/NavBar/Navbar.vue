<template>
  <nav>
    <div class="nav-item">
      <Logo />
    </div>
    <div class="nav-item nav-menu">
      <NavBarLink class="item" to="/" icon="home">Home</NavBarLink>
      <NavBarLink class="item" to="/deckLists" icon="clone">My Decks</NavBarLink>
      <NavBarLink class="item" to="/search" icon="search">Search</NavBarLink>
      <NavBarLink class="item" to="/wip" icon="gear">WIP</NavBarLink>
    </div>
    <div class="nav-item nav-user" v-if="$store.state.user.logged">
      {{$store.state.user.username}}&nbsp;
      <el-avatar src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
    </div>
    <div class="nav-item nav-user" v-else>
      <el-link @click="$router.push({ name: 'login' })">
        <el-icon class="el-icon--left">
          <UserFilled />
        </el-icon>
        Login
      </el-link>
    </div>
  </nav>
</template>

<script>
import {
  ElAvatar,
  ElLink,
  ElIcon,
} from 'element-plus';
import {
  UserFilled,
} from '@element-plus/icons-vue';
import NavBarLink from './NavBarLink.vue';
import Logo from '../Logo.vue';

export default {
  name: 'NavBar',
  components: {
    NavBarLink,
    Logo,
    'el-avatar': ElAvatar,
    'el-link': ElLink,
    'el-icon': ElIcon,
    UserFilled,
  },
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
  justify-content: space-between;
  height:95px;

  background-color: rgb(107,38,63);
  background-image:
  linear-gradient(90deg, rgb(96, 35, 57) 0%, rgb(21, 24, 35) 100%);
}

.nav-item {
  display: inline-flex;
  flex: 1;
  align-items: center;

  &.nav-menu {
    justify-content: center;
  }
  &.nav-user {
    justify-content: end;

    & .el-link {
      --el-link-font-size: 18px;
    }
  }
}

.normal-btn {
  padding: 4px 8px;
  border-radius: 5px;

  color: $text-color;
  background: $medium-glass-background;
  transition: 0.3s;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    background: $strong-glass-background;
  }
  &.margin-bottom {
    margin-bottom: 10px;
  }
}
</style>
