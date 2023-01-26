<template>
    <div class="logo-align">
      <img src="@/assets/images/logo.png" alt="logo" class="logo"/>
      <div class="siteTitle">Kind of Magic</div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Radley&display=swap');

.logo {
  padding: 15px 15px 15px 0;
  height: 60px;
  width: 40px;
}
.siteTitle {
  font-family: 'Ubuntu', serif;
  color: $text-color;
  font-size: 30px;
}
.logo-align {
  display: inline-flex;
  align-items: center;
}
</style>
