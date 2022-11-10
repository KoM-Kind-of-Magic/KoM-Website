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
            appearence="edit"
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
        <div class="deckInputContainer">
          <Input
            @getInputValue="setDeckName"
            placeholder="Name"
            class="name_input"
          />
          <SelectComp
            id="formatSelect"
            placeholder="Select a Deck format"
            @getInputValue="setDeckFormat"
          />
        </div>
        <TextArea
          placeholder="Description"
          class="desc_input"
          @getInputValue="setDeckDesc"
        />
        <div class="deckActions">
          <Button class="updateDeck" @click="updateDeck()">Validate</Button>
        </div>
      </div>
      <div class="searchCards">
        <div class="title">
          Search for cards
        </div>
        <Input
          @getInputValue="triggerSearch"
          placeholder="Search"
          class="search_input"
        />
        <fa class="icon performSearch" icon="magnifying-glass" />

        <div class="searchResult">
          <CardSearched v-for=" card in cardsSearched"
            :key="card.id"
            :card="card"
            @addCardFromSearch="addCardFromSearch"
            @click="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import CardLine from '../components/card/CardLine.vue';
import CardSearched from '../components/card/CardSearched.vue';
import TextArea from '../components/TextArea.vue';
import Input from '../components/Input.vue';
import SelectComp from '../components/Select.vue';
import Button from '../components/Button.vue';

export default {
  name: 'DeckEditorView',
  components: {
    CardLine,
    CardSearched,
    TextArea,
    Input,
    SelectComp,
    Button,
  },
  methods: {
    getList() {
      axios.get('http://localhost:8081/cards')
        .then((response) => {
          console.log(response.data);
        });
    },
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
    addCardFromSearch(card) {
      if (this.cards.filter((c) => c.id === card.id).length) {
        this.cards[this.cards.findIndex((c) => c.id === card.id)].number += 1;
      } else {
        this.cards.push(card);
      }
    },
    updateDeck() {
      console.log('Updated deck :');
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
    triggerSearch(searchInfos) {
      console.log('Method call with following infos :');
      console.log(searchInfos);
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
    sortByTypes() {
      // console.log(newVal);
    },
  },
  data() {
    return {
      deckName: '',
      deckFormat: '',
      deckDesc: '',
      cards: [
        {
          name: 'Mana vault',
          id: '6',
          number: 1,
          type: 'artifact',
        },
        {
          name: 'Yarok, the Desecrated',
          id: '1',
          isCommander: true,
          number: 3,
          type: 'creature',
        },
        {
          name: 'Asmoranomardicadaistinaculdacar',
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
      cardsSearched: [
        {
          name: 'Lotus Cobra',
          id: '10',
          imgUrl: 'https://cards.scryfall.io/large/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Sword of heart and home',
          id: '11',
          imgUrl: 'https://cards.scryfall.io/large/front/a/1/a16fabbe-4557-4067-b882-f2e5dbd8b458.jpg?1626099357',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Talisman of curiosity',
          id: '12',
          imgUrl: 'https://cards.scryfall.io/normal/front/f/d/fd52688a-39fd-430f-b950-cb56e0004396.jpg?1562202516',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Talisman of indulgence',
          id: '13',
          imgUrl: 'https://cards.scryfall.io/normal/front/f/a/fa6c62c7-8fd4-46f1-a7f4-fc6e74d34b35.jpg?1631589255',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Wishclaw Talisman',
          id: '14',
          imgUrl: 'https://cards.scryfall.io/normal/front/0/7/07c17b01-ee5d-491a-8403-b3f819b778c4.jpg?1572490271',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Yoshimaru, Ever Faithfull',
          id: '15',
          imgUrl: 'https://cards.scryfall.io/large/front/a/a/aa409269-3698-42a2-8c51-75557b27a6f6.jpg?1664653410',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Yarok, the Desecrated',
          id: '1',
          imgUrl: 'https://cards.scryfall.io/normal/front/a/1/a1001d43-e11b-4e5e-acd4-4a50ef89977f.jpg?1592517590',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Zur, the enchanter',
          id: '16',
          imgUrl: 'https://cards.scryfall.io/normal/front/a/e/aeb0160a-dfdc-4b1f-865e-ef905aee65d5.jpg?1662987603',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Zur, Eternal Schemer',
          id: '17',
          imgUrl: 'https://cards.scryfall.io/normal/front/4/d/4d987435-2403-4e0f-b19d-693da923ba50.jpg?1663051659',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Chandra',
          id: '8',
          imgUrl: 'https://cards.scryfall.io/large/front/4/9/49d2a680-4f3b-4bfa-b77b-d2dfaced9f23.jpg?1592516849',
          type: 'planeswalker',
          number: 1,
        },
        {
          name: 'Phyrexian Tower',
          id: '9',
          imgUrl: 'https://cards.scryfall.io/large/front/0/5/05b2cc68-1d20-421f-9800-af0996071554.jpg?1601081190',
          type: 'planeswalker',
          number: 1,
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
  min-width: 400px;

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
  margin: 0 20px 20px 20px;
  min-width: 360px;
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
  height: 300px;
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
#deckEditor .desc_input,
.deckInfos .deckInputContainer,
#deckEditor .updateDeck {
  margin: 10px auto 0 auto;
  width: 80%;
}
.deckInfos .deckInputContainer {
  display: flex;
  flex-direction: row;
  justify-content: center
}

#deckEditor .formInput .el-input__wrapper {
  background: $dark-background;
  margin: 0 10px 0 0;
  max-width: 500px;
  width: auto;
  min-width: 100px;
}

#deckEditor .desc_input .el-textarea__inner {
  box-shadow: none;
  color: $text-color;
  max-height: 150px;
}
#deckEditor .desc_input .el-textarea__inner::placeholder {
  color: $text-color;
}

#deckEditor .select .el-input__wrapper {
  background: $dark-background;
}
#deckEditor .select .vs__dropdown-menu {
  background: $dark-background;
  color: $text-color;
}
#deckEditor .select .vs__dropdown-toggle {
  background: $dark-background;
}
#deckEditor .select .vs__dropdown-menu li:hover {
  background: $light-glass-background-select;
}

#deckEditor .updateDeck {
  position: initial;
  z-index: 1;
  display: flex;
  flex-direction: row-reverse;
}

.searchCards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
}

#deckEditor .search_input {
  height: 40px;
  margin: 10px auto 0 auto;
  width: 80%;
}
#deckEditor .search_input .el-input__wrapper {
  max-width: none;
  width: 100%;
  margin: 0;
}

#deckEditor .searchCards .performSearch {
  position: absolute;
  top: 65px;
  z-index: 3;
  right: 10%;
  opacity: 0.7;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
}

#deckEditor .searchCards .performSearch:hover {
  opacity: 1;
}

.searchResult {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin: 10px auto 0 auto;
  width: 90%;
  overflow-y: scroll;
}

</style>
