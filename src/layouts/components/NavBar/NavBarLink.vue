<template>
  <router-link :to="to" class="link" :class="{active: isActive}">
    <fa class="icon" :icon="icon" />
    <span>
      <slot />
    </span>
  </router-link>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'NavBarLink',
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return { isActive };
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;

  background: $medium-glass-background;
  text-decoration: none;
  color: $text-color;
  font-size: 20px;

  transition: 0.3s;
  padding: 10px;
  margin: 5px;

  border-bottom: 1px solid transparent;
  border-radius: 5px;
}

.link:hover {
  background: $strong-glass-background;
}

.link.active {
  border-bottom: 1px solid red;
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin: 0 10px 0 15px;
}

</style>
