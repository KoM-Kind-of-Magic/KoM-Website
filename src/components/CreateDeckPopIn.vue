<template>
  <div class="popInBackground" @click.self="closeModal" @keydown="c">
    <div id="createDeckPopIn">
      <div class="title">Create a new deck</div>
      <button @click="closeModal">
        close
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateDeckPopIn',
  components: {
  },
  created() {
    document.addEventListener('keyup', this.closeModalOnEscPress);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    closeModalOnEscPress(event) {
      if (event.keyCode === 27) {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>
.popInBackground {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  background: #00000044;
}

#createDeckPopIn {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  background: black;

  border-radius: 10px;

  width: 33%;
  min-width: 300px;
  max-width: 500px;

  height: 40%;
  min-height: 300px;
  max-height: 500px;

  z-index: 3;

  top: 200px;
}

.title {
  color: white;
  text-align: center;
  width: fit-content;
}
</style>
