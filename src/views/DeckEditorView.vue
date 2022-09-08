<template>
  <div id="deckEditor">
    <div class="currentDeck">
      <div class="title">
        Cards in your deck
      </div>
      <CardLine v-for="card in cards" :key="card.id" :card="card"/>
    </div>
    <div class="infos-search-container">
      <div class="deckInfos">
        <div class="title">
          Deck Informations
        </div>
      </div>
      <div class="searchCards">
        <div class="title">
          Search for cards
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardLine from '../components/CardLine.vue';

export default {
  name: 'DeckEditorView',
  methods: {
  },
  components: { CardLine },
  data() {
    return {
      cards: [
        {
          name: 'Yarok',
          id: '1',
          isCommander: true,
        },
        {
          name: 'Atraxa',
          id: '2',
        },
        {
          name: 'Sliver Queen',
          id: '3',
        },
        {
          name: 'Ulamog',
          id: '4',
        },
        {
          name: 'Ghired',
          id: '5',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

#deckEditor {
  position: absolute;
  top: 100px;
  bottom: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  color: $text-color;
}

.currentDeck {
  width: 33%;

  display: flex;
  flex-direction: column;

  margin: 0 0 0 50px;
}

.currentDeck .title {
  text-align: center;
}

.currentDeck,
.deckInfos,
.searchCards {
  background: $light-glass-background;
}

.infos-search-container {
  display: flex;
  flex-direction: column;
  width: 66%;
  margin: 0 50px 0 0;
}

.deckInfos {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
}

.title::after {
  content: '';
  width: 100px;
  height: 3px;
  display: block;
  margin: 5px auto;

  background: $title-underline-color;
}

</style>
