<template>
  <div id="deckEditor">
    <div class="currentDeck">
      <div class="title">
        Cards in your deck
      </div>
      <div class="cardContainer">
        <div class="cardTypeContainer" v-for="types in Object.keys(sortByTypes)" :key="types">
          <div class="title">{{types}}</div>
          <CardLine v-for="card in sortByTypes[types]"
            :key="card.id"
            :card="card"
            @removeAllCards="removeAllCards"
            @removeCard="removeCard"
            @addCard="addCard"
          />
        </div>
      </div>
    </div>
    <div class="infos-search-container">
      <div class="deckInfos">
        <div class="title">
          Deck Informations
        </div>
        <TextArea
          placeholder="Description"
          class="desc_input"
          @getInputValue="setDeckDesc"
        />
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
import TextArea from '../components/TextArea.vue';

export default {
  name: 'DeckEditorView',
  methods: {
    removeAllCards(cardId) {
      const index = this.cards.map((el) => el.id).indexOf(cardId);
      this.cards.splice(index, 1);
    },
    removeCard(cardId) {
      const index = this.cards.map((el) => el.id).indexOf(cardId);
      if (this.cards[index].number === 1) {
        this.removeAllCards(cardId);
      } else {
        this.cards[index].number -= 1;
      }
      console.log(this.cards[index].number);
    },
    addCard(cardId) {
      const index = this.cards.map((el) => el.id).indexOf(cardId);
      if (this.cards[index].number < 999) {
        this.cards[index].number += 1;
      }
      console.log(this.cards[index].number);
    },
  },
  computed: {
    sortByTypes() {
      const res = {};
      const cardTypes = [...new Set(this.cards.map((c) => c.type))];
      //
      cardTypes.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      });
      cardTypes.forEach((t) => {
        res[t] = [];
      });
      this.cards.forEach((c) => {
        res[c.type].push(c);
      });
      return res;
    },
  },
  watch: {
    sortByTypes(newVal) {
      // console.log(newVal);
    },
  },
  components: {
    CardLine,
    TextArea,
  },
  data() {
    return {
      cards: [
        {
          name: 'Mana vault',
          id: '6',
          number: 1,
          type: 'artifact',
        },
        {
          name: 'Yarok',
          id: '1',
          isCommander: true,
          number: 3,
          type: 'creature',
        },
        {
          name: 'Atraxa',
          id: '2',
          number: 2,
          type: 'creature',
        },
        {
          name: 'Sliver Queen',
          id: '3',
          number: 1,
          type: 'creature',
        },
        {
          name: 'Ulamog',
          id: '4',
          number: 25,
          type: 'creature',
        },
        {
          name: 'Ghired',
          id: '5',
          number: 999,
          type: 'creature',
        },
        {
          name: 'Mox diamond',
          id: '7',
          number: 2,
          type: 'artifact',
        },
        {
          name: 'Chandra',
          id: '8',
          number: 4,
          type: 'planeswalker',
        },
        {
          name: 'Phyrexian Tower',
          id: '9',
          number: 4,
          type: 'land',
        },
      ],
    };
  },
};
</script>

<style lang="scss">

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
.currentDeck .cardTypeContainer .title {
  font-size: 15px;
  margin: 10px 0 0 0;
}
.currentDeck .cardTypeContainer .title::first-letter {
  text-transform: capitalize;
}
.currentDeck .cardTypeContainer .title::after {
  height: 0px;
  background: $dark-background;
}

.cardContainer {
  overflow-y: scroll;
  padding: 0 0 0 20px;
  margin: 0 20px 20px 0;
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
  margin: 20px 0 0 0;
}

.title::after {
  content: '';
  width: 100px;
  height: 3px;
  display: block;
  margin: 5px auto;

  background: $title-underline-color;
}

#deckEditor .desc_input .el-textarea__inner{
  background: $dark-background;
}

#deckEditor .desc_input .el-input__count {
  background: transparent;
}

</style>
