<template>
  <div class="popInBackground" @click.self="closeModal" @keydown="c">
    <div id="createDeckPopIn">
      <div class="title">Create a new deck</div>
      <div class="closeModal" @click="closeModal" @keydown="c">
        <fa class="icon" icon="xmark" />
      </div>
      <div class="input">
        <Input
          @getInputValue="setDeckName"
          placeholder="Name"
          class="name_input"
        />
      </div>
      <div class="input">
        <SelectComp
          id="formatSelect"
          placeholder="Select a Deck format"
          @getInputValue="setDeckFormat"
        />
      </div>
      <div class="input">
        <TextArea
          placeholder="Description"
          class="desc_input"
          @getInputValue="setDeckDesc"
        />
      </div>
      <Button class="createDeckBtn" @click="createDeck()">Create</Button>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';
import Button from './Button.vue';
import SelectComp from './Select.vue';
import TextArea from './TextArea.vue';

export default {
  name: 'CreateDeckPopIn',
  components: {
    Input,
    Button,
    SelectComp,
    TextArea,
  },
  data: () => ({
    deckName: '',
    deckFormat: '',
    deckDesc: '',
  }),
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
    createDeck() {
      console.log('Create deck :');
      console.log(this.deckName);
      console.log(this.deckFormat);
      console.log(this.deckDesc);
    },
    setDeckName(deckName) {
      this.deckName = deckName;
    },
    setDeckFormat(deckFormat) {
      this.deckFormat = deckFormat;
    },
    setDeckDesc(deckDesc) {
      this.deckDesc = deckDesc;
    },
  },
};
</script>

<style lang="scss">
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
  background: #151823;

  border-radius: 10px;

  width: 400px;
  height: 450px;

  z-index: 3;

  top: 200px;
}

#createDeckPopIn .title {
  color: $text-color;
  text-align: center;
  width: fit-content;
  margin: 15px 0 30px 0;
  font-size: 18px;
  padding: 5px 10px;
  cursor: default;
}
#createDeckPopIn .title::after {
  content: '';
  width: 100px;
  height: 3px;
  display: block;
  margin: 5px auto;

  background: $title-underline-color;
}

.closeModal .icon {
  width: 20px;
  height: 20px;
  color: $text-color;
}

.closeModal {
  position: absolute;
  cursor: pointer;
  right: 0;
  max-width: 20px;
  max-height: 20px;
  padding: 6px;
  border-radius: 10px;
  background: $light-glass-background;
  transition: 0.3s;
}
.input {
  margin-bottom: 20px;
}
.closeModal:hover {
  background: $medium-glass-background;
}

#createDeckPopIn .desc_input .el-textarea__inner {
  background: $light-glass-background-select;
  box-shadow: none;
  width: 310px;
  color: $text-color;
  padding: 10px;
  max-height: 150px;
}

#createDeckPopIn .desc_input .el-input__count {
  background: transparent;
}
</style>
