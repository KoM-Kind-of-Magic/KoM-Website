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
        {{tab.name}}
      </NavBarLink>
    </div>
    <div class="nav-item nav-search">
      <label for="nav-search">
        <input type="text" name="nav-search" id="nav-search" placeholder="Search a card...">
        <el-icon>
          <Search />
        </el-icon>
      </label>
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
        <span class="login-now">
          Register/Login
        </span>
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
  // Files,
  // House,
  Search,
  // Collection,
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
    // Files,
    // House,
    Search,
    // Collection,
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
            'cardPage',
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
  height: 80px;
  padding: 15px 20px;
  box-sizing: border-box;
  background: #602040;
  box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.5);
}

.nav-item {
  display: flex;

  &.nav-menu {
    margin-left: 80px;
    display: flex;
    flex-direction: row;
    gap: 60px;
  }
  &.nav-user {

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
  &.nav-user a:hover::after {
    border: none;
  }
  &.nav-search {
    margin: 0 0 0 auto;
  }
  &.nav-search label {
    display: flex;
    flex-direction: row;

    height: 50px;
    width: 500px;
    transform: translateX(40px);
  }
  &.nav-search label .el-icon {
    font-size: 25px;
    margin: auto 15px auto 0;
    transform: translateX(-50px);
    cursor: pointer;
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
}

#nav-search {
  background: transparent;
  border: none;
  width: 100%;
  padding-left: 20px;
  font-size: 18px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 0 15px 0 auto;

  transition: 0.3s;
}
#nav-search:focus  {
  background: transparent;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
}
#nav-search::placeholder {
  opacity: 0.8;
  margin-left: 10px;
  font-size: 14px;
}

.userAvatar {
  cursor: pointer;
}
.userAvatar .el-avatar {
  height: 45px;
  width: 45px;
  background: $primary-color;
}

.login-now {
  background: $primary-color;
  height: 50px;
  width: 180px;
  border-radius: 5px;
  transition: 0.3s;
  text-decoration: none;
  text-align: center;
  justify-content: center;
}

.login-now:hover {
  background: $primary-color-hover;
}
</style>
