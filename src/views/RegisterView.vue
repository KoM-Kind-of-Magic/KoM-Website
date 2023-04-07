<template>
  <div class="container" @keyup.enter="signup()">
    <div class="register-card">
      <div class="logo-div">
        <img class="img" src="@/assets/images/logo.png" alt="image"/>
        <div class="logo-name">Kind of Magic</div>
      </div>
      <div class="card-title">
        Sign up
      </div>
      <div class="username-div">
        <el-input
          v-model="username"
          placeholder="Username"
          size="large"
          :maxlength="100"
          class="input-style"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="email-div">
        <el-input
          v-model="email"
          placeholder="Email"
          size="large"
          :maxlength="100"
          :class="(emailError ? 'input-error' : '') + ' input-style'"
          @blur="checkEmailValidity()"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Message /></el-icon>
          </template>
        </el-input>
        <div class="msg-error" v-show="emailError">
          Email not valid
        </div>
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
      <div class="confirmPassword-div">
        <el-input
          v-model="confirmPassword"
          placeholder="Confirm password"
          type="password"
          show-password
          size="large"
          :maxlength="100"
          :class="(passwordError ? 'input-error' : '') +
          ' input-style'"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
        <div class="msg-error" v-show="passwordError">
          Password confirm not matching with password
        </div>
      </div>
      <div class="signupbtn-div">
        <Button class="signUp-btn" @click="signup()">Sign up</Button>
      </div>
      <div class="register-div">
        Already a member ?
        <ElLink class="link-style" :underline="false" @click="redirectTologin()">login now</ElLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import {
  ElInput,
  ElLink,
  ElIcon,
  ElNotification,
} from 'element-plus';
import {
  User,
  Lock,
  Message,
} from '@element-plus/icons-vue';
import Button from '../components/Button.vue';

export default {
  name: 'RegisterView',
  components: {
    Button,
    'el-input': ElInput,
    ElLink,
    'el-icon': ElIcon,
    User,
    Lock,
    Message,
  },
  computed: {
    passwordError() {
      return this.password
        && this.confirmPassword
        && this.confirmPassword !== this.password;
    },
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailError: false,
    };
  },
  methods: {
    signup() {
      if (this.username && !this.emailError && !this.passwordError) {
        axios.post(
          `${process.env.VUE_APP_API_URL}/auth/register`,
          {
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword,
            username: this.username,
          },
        ).then((response) => {
          if (response.status < 400) {
            ElNotification({
              title: 'Success',
              message: 'Account created successfully !',
              type: 'success',
              position: 'bottom-right',
            });
            this.$router.push({ name: 'login' });
          }
        }).catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.response.data,
            type: 'error',
            position: 'bottom-right',
          });
        });
      } else {
        ElNotification({
          title: 'Error',
          message: 'Please complete all fields correctly to register.',
          type: 'error',
          position: 'bottom-right',
        });
      }
    },
    redirectTologin() {
      this.$router.push({ name: 'login' });
    },
    checkEmailValidity() {
      this.emailError = !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  width: 100%;
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

.signUp-btn {
  position: relative;
  bottom: 0;
  display: inline-flex;
}

.msg-error {
  color: #da0000;
}

.input-style {
  --el-input-bg-color: #ffffff33;
  --el-input-text-color: white;
  --el-input-border-color: #00000000;
}

.input-error {
  --el-input-border-color: #da0000;
}

.checkbox-style {
  --el-checkbox-text-color: white;
}

.link-style {
  --el-link-font-size: inherit;
  --el-link-text-color: #c74471;
}
</style>
