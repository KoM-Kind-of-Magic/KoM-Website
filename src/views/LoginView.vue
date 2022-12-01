<template>
  <div class="container">
    <div class="login-card">
      <div class="logo-div">
        <img class="img" src="@/assets/images/logo.png" alt="image"/>
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
import { ref } from 'vue';
import {
  ElInput,
  ElCheckbox,
  ElLink,
  ElIcon,
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
      console.log('signin');
    },
    registerNow() {
      this.$router.push({ name: 'register' });
    },
  },
  setup() {
    const currentDate = ref(new Date());
    return {
      currentDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  width: 100%;
  padding-top: 24px;
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
