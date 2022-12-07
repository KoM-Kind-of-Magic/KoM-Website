<template>
  <div class="container" @keyup.enter="signin()">
    <div class="login-card">
      <div class="logo-div">
        <img class="img" src="@/assets/images/logo.png" alt="image"/>
        <div class="logo-name">Kind of Magic</div>
      </div>
      <div class="card-title">
        Sign in
      </div>
      <div class="username-div">
        <el-input
          v-model="email"
          placeholder="Email"
          size="large"
          :maxlength="100"
          class="input-style"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Message /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="password-div">
        <el-input
          v-model="password"
          placeholder="Password"
          type="password"
          show-password
          size="large"
          :maxlength="100"
          class="input-style"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="keeplogged-div">
        <el-checkbox class="checkbox-style" v-model="keepLogged">Keep me logged in</el-checkbox>
      </div>
      <div class="signinbtn-div">
        <Button class="signIn-btn" @click="signin()">Sign in</Button>
      </div>
      <div class="register-div">
        Not a member ?
        <ElLink class="link-style" :underline="false" @click="registerNow()">Register now</ElLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import {
  ElInput,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElMessage,
} from 'element-plus';
import {
  Message,
  Lock,
} from '@element-plus/icons-vue';
import Button from '../components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Button,
    'el-input': ElInput,
    'el-checkbox': ElCheckbox,
    ElLink,
    'el-icon': ElIcon,
    Message,
    Lock,
  },
  data() {
    return {
      email: '',
      password: '',
      keepLogged: false,
    };
  },
  methods: {
    signin() {
      if (this.email && this.password) {
        axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          {
            email: this.email,
            password: this.password,
          },
        ).then((response) => {
          if (response.status < 400) {
            ElMessage({
              message: 'Logged',
              type: 'success',
            });
            const ld = new Date();
            const userInfo = {
              logged: true,
              loginDate: ld.toString(),
              loginKeep: this.keepLogged,
              username: response.data.username ?? '',
              email: response.data.email ?? this.email,
              token: response.data.token,
            };
            this.$store.dispatch('setUser', userInfo);
            localStorage.userInfo = JSON.stringify(userInfo);
            this.$router.push({ name: 'home' });
          }
        }).catch((error) => {
          if (error.response && error.response.data) {
            ElMessage({
              message: error.response.data,
              type: 'error',
            });
          } else {
            console.error(error);
          }
        });
      } else {
        ElMessage({
          message: 'Please complete all fields correctly to sign in.',
          type: 'error',
        });
      }
    },
    registerNow() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  width: 100%;
}

.login-card {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  text-align: center;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.1);
  gap: 32px;
  padding: 32px 52px;
  border-radius: 12px;
  color: white;

  & .logo-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    & .logo-name {
      font-family: 'Radley', serif;
      color: white;
      font-size: 36px;
    }
  }
}

.card-title {
  font-size: 24px;
}

.signIn-btn {
  position: relative;
  bottom: 0;
  display: inline-flex;
}

.input-style {
  --el-input-bg-color: #ffffff33;
  --el-input-text-color: white;
  --el-input-border-color: #00000000;
}

.checkbox-style {
  --el-checkbox-text-color: white;
}

.link-style {
  --el-link-font-size: inherit;
  --el-link-text-color: #c74471;
}
</style>
