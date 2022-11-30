<template>
  <div class="container">
    <div class="register-card">
      <div class="logo-div">
        <img class="img" src="@/assets/images/logo.png" alt="image"/>
      </div>
      <div class="card-title">
        Sign up
      </div>
      <div class="username-div">
        <el-input
          v-model="username"
          placeholder="Username"
          class="input-style"
        />
      </div>
      <div class="email-div">
        <el-input
          v-model="email"
          placeholder="Email"
          class="input-style"
        />
      </div>
      <div class="password-div">
        <el-input
          v-model="password"
          placeholder="Password"
          type="password"
          show-password
          class="input-style"
        />
      </div>
      <div class="confirmPassword-div">
        <el-input
          v-model="confirmPassword"
          placeholder="Confirm password"
          type="password"
          show-password
          class="input-style"
        />
      </div>
      <div class="signupbtn-div">
        <Button class="signUp-btn" @click="signup()">Sign up</Button>
      </div>
      <div class="register-div">
        Already a member ?
        <ElLink class="link-style" :underline="false" @click="login()">login now</ElLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElInput, ElLink } from 'element-plus';
import Button from '../components/Button.vue';

export default {
  name: 'RegisterView',
  components: {
    Button,
    'el-input': ElInput,
    ElLink,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      keepLogged: false,
    };
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setPassword(password) {
      this.password = password;
    },
    signup() {
      console.log('signin');
    },
    login() {
      this.$router.push({ name: 'login' });
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

.register-card {
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

.signUp-btn {
  position: relative;
  bottom: 0;
  display: inline-flex;
}

.input-style {
  --el-input-bg-color: #ffffff33;
  --el-input-text-color: white;
}

.checkbox-style {
  --el-checkbox-text-color: white;
}

.link-style {
  --el-link-font-size: inherit;
  --el-link-text-color: #c74471;
}
</style>
