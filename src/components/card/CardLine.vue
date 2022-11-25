<template>
  <div
    class="cardLine"
    :class="[card.isCommander ? 'commanderCard' : '']"
    @mouseover="cardHovered = true"
    @mouseleave="cardHovered = false"
    @focusin="cardHovered = true"
    @focusout="cardHovered = false"
    @mousemove.prevent="onMouseMove($event)"
  >
    <div class="cardInfos">
      <div class="cardAmount">
        {{card.number}}
      </div>
      <div class="cardName">
        {{card.name}}
      </div>
    </div>
    <div class="cardActions" v-show="appearence === 'edit'">
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
    <img
      :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image`"
      class="image"
      v-show="cardHovered && mouseX>0 && mouseY>0 && card.scryfallId"
      alt="card's image"
      ref="cardImage"
      :style="`left: ${mouseX}px; top: ${mouseY}px;`"
    ><!-- https://mtgjson.com/faq/#how-do-i-access-a-card-s-imagery -->
  </div>
</template>

<script>

export default {
  name: 'CardLine',
  props: {
    card: { type: Object, required: true },
    id: { type: String, required: false },
    appearence: { type: String, required: false, default: 'default' },
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
    onMouseMove(e) {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    },
  },
  data() {
    return {
      cardHovered: false,
      mouseX: 0,
      mouseY: 0,
    };
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

  color: white;
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

.image {
  position: absolute;
  width: 200px;
  pointer-events: none;
  overflow: hidden;
  position: fixed;
}
</style>
