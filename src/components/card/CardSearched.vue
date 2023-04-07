<template>
  <div class="card">
    <img
      :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image`"
      class="image card-image"
      alt="image"
    />
    <div class="actions">
      <fa class="icon addCard" title="add" @click="addCardFromSearch(card)" icon="plus" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSearchedView',
  props: {
    card: { type: Object, required: true },
    id: { type: String, required: false },
  },
  components: {
  },
  methods: {
    addCardFromSearch(card) {
      this.$emit('addCardFromSearch', card);
    },
  },
  computed: {
  },
  watch: {
  },
  data() {
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 180px;
  height: fit-content;

  background: none;
  border-radius: none;
  box-shadow: 0 none;
  backdrop-filter: none ;
  border: none;

  float: left;
  margin: 0;
  padding: 0;

  position: relative;
}
.card .actions {
  display: flex;
  opacity: 0;
  position: absolute;
  width: 100%;
  flex-direction: row;
  justify-content: end;
  background: rgba(0, 0, 0, 0.5);
  right: 0;
  transition: 0.3s;
  transform: translateY(-24px);
  border-radius: 7px;
  z-index: 3;
}

.card .actions .icon {
  opacity: 0.8;
  transition: 0.2s;
  cursor: pointer;
  margin: 4px 6px;
}
.card .actions .icon:hover {
  opacity: 1;
}

.card:hover .actions {
  opacity: 1;
}
</style>
