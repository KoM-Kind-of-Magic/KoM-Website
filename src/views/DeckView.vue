<template>
  <div class="content">
    <div class="masonry" v-if="Object.keys(sortByTypes).length > 0">
      <div class="item" v-for="types in Object.keys(sortByTypes)" :key="types">
        <div class="item__content">
          <div class="type-name">{{types}}</div>
          <CardLine v-for="card in sortByTypes[types]"
            :key="card.id"
            :card="card"
            class="card-in-deck"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardLine from '../components/card/CardLine.vue';

export default {
  name: 'DeckView',
  components: {
    CardLine,
  },
  props: {
    sortByTypes: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .masonry {
    column-count: 1;
    column-gap: 10px;
  }

  @media (min-width: 800px) {
    .masonry {
      column-count: 2;
    }
  }

  @media (min-width: 1100px) {
    .masonry {
      column-count: 3;
    }
  }

  @media (min-width: 1550px) {
    .masonry {
      column-count: 4;
    }
  }

  .item {
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 10px;
    break-inside: avoid;

    &__content {
      flex-direction: column;
      width: 100%;
    }
  }
  .content {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
  }

  .type-name {
    text-transform: capitalize;
    margin: 4px;
    display: inline-block;
    color: white;
  }

  .card-in-deck {
    margin: 4px;
  }

</style>
