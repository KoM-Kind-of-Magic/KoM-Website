<template>
  <div class="page-not-found">
    <div class="image">
      <img src="@/assets/images/PageNotFound.gif" alt="logo" class="logo"/>
    </div>
    <div class="code">
      Error 404
    </div>
    <div class="text">
      Page not found :(
    </div>
    <div class="btn">
      <div
        @keydown="c"
        class="normal-btn"
        @click="backHome()"
      >
        Back to home
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PageNotFound',
  components: {
  },
  methods: {
    backHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped lang="scss">
  .page-not-found {
    color: white;
    max-width: 600px;
    margin: auto;
    text-align: center;
    gap: 10px;
    display: grid;

    & .image {
      height: 250px;
      margin: auto;

      & img {
        height: 100%;
      }
    }
    & .code {
      font-size: 20px;
    }
    & .text {
      font-size: 40px;
    }
    & .btn {
      & .normal-btn {
        width: fit-content;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 5px;

        color: $text-color;
        background: $medium-glass-background;
        transition: 0.3s;
        font-size: 18px;
      }
      & .normal-btn:hover {
        cursor: pointer;
        background: $strong-glass-background;
      }
    }
  }
</style>
