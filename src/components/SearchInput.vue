<template>
  <div class="search-wrapper">
    <Input @getInputValue="inputValue" class="search-input" placeholder="Type your Search..."
    @keyup.enter="handleKeyUp" />
      <Button class="search-btn" @click="openResults()">
        <el-icon class="el-input__icon"><Search /></el-icon>
      </Button>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Input from './Input.vue';

export default {
  name: 'SearchInput',
  components: {
    Input,
    Search,
  },

  data: () => ({
    value: '',
  }),

  setup() {
    const router = useRouter();
    const openResults = () => {
      router.push({
        name: 'searchResults',
      });
    };
    const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
        openResults();
      }
    };
    return {
      openResults,
      handleKeyUp,
    };
  },

  methods: {
    inputValue(value) {
      this.value = value;
    },
  },
};
</script>

<style lang="scss">
.search-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 50px;
  position: relative;
  .icon-right {
    position: absolute;
    right: 460px;
    top: 80px;
    transform: translateY(-50%);
  }
  .icon {
    height: 28px;
    width: 28px;
  }
}
.formInput {
  .el-input__wrapper {
    background-color: rgba(255,255,255,0.07);
    border-radius: 8px 0 0 8px;
    font-size: 20px;
  }
}
.search-input {
  box-sizing: border-box;
  width: 120vh;
  height: 60px;

  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
}
.search-btn {
  width: 45px;
  border-radius: 0 8px 8px 0;
  font-size: 20px;
  border: 1px solid rgba(255,255,255,0.07);
}
</style>
