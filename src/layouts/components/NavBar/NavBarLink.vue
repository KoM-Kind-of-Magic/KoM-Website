<template>
  <router-link :to="to" class="link" :class="{active: isActive}">
      <slot />
  </router-link>
</template>

<script>

export default {
  name: 'NavBarLink',
  props: {
    to: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;

  text-decoration: none;
  color: $text-color;
  font-size: 20px;

  transition: 0.5s;
  padding: 10px;

  white-space: nowrap;
  gap: 10px;

  border: 1px solid transparent ;
}

.link.active {
  border-bottom: 1px solid white;
}
</style>
