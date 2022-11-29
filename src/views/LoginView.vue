<template>
  <div class="container">
    <div class="login-card">
      <div class="logo-div">
        <img class="img" src="@/assets/images/logo.png" alt="image"/>
      </div>
      <div class="username-div">
        <Input
          @getInputValue="triggerSearch"
          placeholder="Username"
          class="name_input"
          :value="username"
        />
      </div>
      <div class="password-div">
        <Input
          @getInputValue="set"
          placeholder="Password"
          class="name_input"
          :value="password"
        />
      </div>
      <div class="keeplogged-div">
        Keep me logged in
      </div>
      <div class="signinbtn-div">
        <Button class="test" @click="signin()">Sign in</Button>
      </div>
      <div class="register-div">
        Not a member ? Register now
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Input,
    Button,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setPassword(password) {
      this.password = password;
    },
    signin() {
      console.log('signin');
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
</style>
