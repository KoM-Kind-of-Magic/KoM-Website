<template>
  <div class="cardLine">
    <div class="cardName" :class="[card.isCommander ? 'commanderCard' : '']">
      {{card.name}}
    </div>
    <div class="cardActions">
      <div class="cardRemove"><fa class="icon" icon="xmark" /></div>
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
  transition: 0.1s;
}

.cardLine:hover .cardActions {
  opacity: 1;
}

.cardName {
  cursor: default;
}

.commanderCard {
  border: 1px solid red;
}
</style>
