<template>
  <div class="cardLine" :class="[card.isCommander ? 'commanderCard' : '']">
    <div class="cardInfos">
      <div class="cardAmount">
        {{card.number}}
      </div>
      <div class="cardName">
        {{card.name}}
      </div>
    </div>
    <div class="cardActions">
      <div class="cardAdd" title="Increase amount" @click="addCard(card.id)" @keydown="c">
        <fa class="icon" icon="plus" />
      </div>
      <div class="cardRemove" title="Reduce amount" @click="removeCard(card.id)" @keydown="c">
        <fa class="icon" icon="minus" />
      </div>
      <div class="cardRemoveAll" title="Remove card" @click="removeAllCards(card.id)" @keydown="c">
        <fa class="icon" icon="trash-can" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardLine',
  props: {
    card: { type: Object, required: true },
    id: { type: String, required: false },
  },
  methods: {
    removeAllCards(cardId) {
      this.$emit('removeAllCards', cardId);
    },
    removeCard(cardId) {
      this.$emit('removeCard', cardId);
    },
    addCard(cardId) {
      this.$emit('addCard', cardId);
    },
  },
  data() {
  },
};
</script>

<style lang="scss" scoped>
.cardLine {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background: $dark-background;
  border-radius: 5px;

  padding: 0 10px;
  font-size: 15px;
  margin: 3px 3px 0 3px;
}

.cardActions .icon{
  transform: translateY(1px);
  cursor: pointer;
}

.cardActions {
  display: flex;
  flex-direction: row;

  opacity: 0;
  transform: translateX(10px);

  transition: 0.1s;
  color: $strong-glass-background;
}

.cardActions > * {
  transition: 0.3s;
  padding: 6px 0 0 10px;
}
.cardActions > *:hover {
  color: $text-color;
}

.cardLine:hover .cardActions {
  opacity: 1;
  transform: translateX(0);
}

.cardName {
  cursor: default;
}

.commanderCard {
  border: 1px solid red;
}

.cardInfos {
  display: flex;
  flex-direction: row;
  line-height: 30px;
}

.cardAmount {
  width: 25px;
  text-align: right;
  margin: 0 5px 0 0;
}

.cardAdd,
.cardRemove,
.cardRemoveAll {
  cursor: pointer;
}
</style>
