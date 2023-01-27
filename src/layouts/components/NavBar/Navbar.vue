<template>
  <nav>
    <div class="nav-item">
      <Logo />
    </div>
    <div class="nav-item nav-menu">
      <NavBarLink
        :class="(tab.routeNames.includes($route.name) ? 'active' : '') + ' item'"
        :to="tab.to"
        v-for="tab in tabs"
        :key="tab.name"
      >
        <el-icon v-if="tab.name == 'Home'">
          <House />
        </el-icon>
        <el-icon v-else-if="tab.name == 'Decks'">
          <Files />
        </el-icon>
        <el-icon v-else-if="tab.name == 'Search'">
          <Search />
        </el-icon>
        <el-icon v-else-if="tab.name == 'Collection'">
          <Collection />
        </el-icon>
        {{tab.name}}
      </NavBarLink>
    </div>
    <div class="nav-item nav-user" v-if="$store.state.user.logged">
      <el-dropdown trigger="click">
        <span class='userAvatar'>
          <el-avatar>
            <el-icon>
              <User />
            </el-icon>
          </el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              {{userName}}
            </el-dropdown-item>
            <el-dropdown-item>
              Settings
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout()" @keydown="c">
              Sign out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElNotification,
} from 'element-plus';
import {
  User,
  Files,
  House,
  Search,
  Collection,
  Plus,
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
    'el-dropdown': ElDropdown,
    'el-dropdown-menu': ElDropdownMenu,
    'el-dropdown-item': ElDropdownItem,
    User,
    Files,
    House,
    Search,
    Collection,
  },
  computed: {
    userName() {
      return this.$store.state.user.username
        ? this.$store.state.user.username
        : this.$store.state.user.email;
    },
  },
  methods: {
    showModal() {
      this.isShow = true;
    },
    hideModal() {
      this.isShow = false;
    },
    logout() {
      this.$store.dispatch('signOutUser');
      localStorage.removeItem('userInfo');
      ElNotification({
        title: 'Disconnected',
        message: 'You have been disconnected.',
        type: 'success',
        position: 'bottom-right',
      });
      this.$router.push({ name: 'login' });
    },
  },
  data() {
    return {
      isShow: false,
      tabs: [
        {
          name: 'Home',
          routeNames: [
            'home',
          ],
          to: '/',
        },
        {
          name: 'Decks',
          routeNames: [
            'deckLists',
            'deck',
            'deckEditor',
            'deckHand',
          ],
          to: '/deckLists',
        },
        {
          name: 'Search',
          routeNames: [
            'search',
          ],
          to: '/search',
        },
        {
          name: 'Collection',
          routeNames: [
            'collection',
          ],
          to: '/collection',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 95px;
  padding: 0 27.5px;
  background: linear-gradient(90deg, rgb(96, 35, 57) 30%, #982b18 100%);
  box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.5);
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

    & span {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: $text-color;
    }

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

.userAvatar {
  cursor: pointer;
}
</style>
