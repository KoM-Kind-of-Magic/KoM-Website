<template>
  <div class="cardLine" :class="[card.isCommander ? 'commanderCard' : '']">
    <div class="cardName">
      {{card.name}}
    </div>
    <div class="cardActions">
      <div class="cardRemove" title="Remove card" @click="removeCard(card.id)" @keydown="c">
        <fa class="icon" icon="xmark" />
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
    removeCard(cardId) {
      this.$emit('removeCard', cardId);
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

  padding: 5px 10px;
  font-size: 15px;
  margin: 3px 3px 0 3px;
}

.cardActions .icon{
  transform: translateY(1px);
  cursor: pointer;
}

.cardActions {
  opacity: 0;
  transform: translateX(10px);

  transition: 0.1s;
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

.cardRemove {
  padding: 0 4px;
  cursor: pointer;
}
</style>
