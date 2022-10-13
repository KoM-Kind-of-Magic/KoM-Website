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
          <div class="card">
            <img
              src="http://media.wizards.com/2016/bVvMNuiu2i_KLD/en_g2UfOun34M.png"
              class="image"
              alt="image"
            />
            <div class="action">
              <fa class="icon addCard" title="add" icon="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardLine from '../components/CardLine.vue';
import TextArea from '../components/TextArea.vue';
import Input from '../components/Input.vue';
import SelectComp from '../components/Select.vue';
import Button from '../components/Button.vue';

export default {
  name: 'DeckEditorView',
  components: {
    CardLine,
    TextArea,
    Input,
    SelectComp,
    Button,
  },
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
    sortByTypes(newVal) {
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
  margin: 0 20px 20px 20px;
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
  flex: 1;
  margin: 10px auto 0 auto;
  width: 90%;
}

.searchResult .card {
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

.searchResult .action {
  display: none;
  position: absolute;
  width: 100%;
  flex-direction: row;
  justify-content: end;
  background: rgba(0, 0, 0, 0.5);
  right: 0;
}

.searchResult .card:hover .action {
  display: flex;
  transform: translateY(-20px);
  transition: 0.3s ease;
}
</style>
