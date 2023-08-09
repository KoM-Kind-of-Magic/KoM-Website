<template>
  <div>
    <div class="view-header">
      <div class="page-title">Deck editor</div>
    </div>
    <div class="deck-editor-container">
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
              :value="this.deckName"
            />
            <v-select
              class="select"
              label="label"
              :options="this.possibleFormats"
              v-model="this.deckFormat">
            </v-select>
          </div>
          <TextArea
            placeholder="Description"
            class="desc_input"
            @getInputValue="setDeckDesc"
            :value="this.deckDesc"
            :rows=4
          />
          <div class="deckActions">
            <div>
              <div class="importAction" @click="importModalShow = true" @keydown="c">Import</div>
            </div>
            <Button class="updateDeck" @click="updateDeck()">Save</Button>
          </div>
        </div>
        <Transition>
          <PopIn
            v-show="importModalShow"
            :title="`Import a deck list`"
            @close="importModalShow = false"
          >
            <TextArea
              placeholder=
                "// Paste card list
1 Sol Ring
2 Forest
                "
              class="importInput"
              @getInputValue="setImport"
              maxlength="10000"
              :value="this.deckImport"
              :rows=15
            />
            <div class="modal-actions">
              <div class="normal-btn" @click="importDeck()" @keydown="c">
                Confirm import
              </div>
              <div class="normal-btn" @click="importModalShow = false" @keydown="c">
                Cancel
              </div>
            </div>
          </PopIn>
        </Transition>
        <div class="searchCards">
          <div class="title">
            Search for cards
          </div>
          <Input
            @getInputValue="triggerSearch"
            placeholder="Search"
            class="search_input"
            :value="this.mySearch"
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
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import _ from 'lodash';

import {
  ElNotification,
} from 'element-plus';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import PopIn from '../components/PopIn.vue';
import CardLine from '../components/card/CardLine.vue';
import CardSearched from '../components/card/CardSearched.vue';
import TextArea from '../components/TextArea.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

export default {
  name: 'DeckEditorView',
  components: {
    'v-select': vSelect,
    CardLine,
    CardSearched,
    TextArea,
    Input,
    Button,
    PopIn,
  },
  created() {
    this.getDeckInfos();

    this.triggerSearch = _.debounce(this.triggerSearch, 500);
  },
  mounted() {
    const route = useRoute();
    this.deckId = route.params.id;
  },
  methods: {
    getDeckInfos() {
      axios.get(`${process.env.VUE_APP_API_URL}/deck/formats`)
        .then((response) => {
          const res = response.data.data;
          const formatedRes = [];

          res.forEach((format) => {
            formatedRes.push(
              {
                value: format,
                label: format[0].toUpperCase() + format.slice(1),
              },
            );
          });

          this.possibleFormats = formatedRes;
        })
        .then(() => {
          axios.get(`${process.env.VUE_APP_API_URL}/deck/${this.deckId}`)
            .then((response) => {
              const res = response.data.data;

              this.deckName = res.name;
              const idx = this.possibleFormats.findIndex((o) => o.value === res.format);
              this.deckFormat = this.possibleFormats[idx];
              this.deckDesc = res.description;
              this.cards = res.cards;
            });
        });
    },
    removeAllCards(uuid) {
      this.cards = this.cards.filter((card) => card.uuid !== uuid);
    },
    removeCard(uuid) {
      const index = this.cards.findIndex((card) => card.uuid === uuid);
      this.cards.splice(index, 1);
    },
    addCard(uuid) {
      const index = this.cards.map((el) => el.uuid).indexOf(uuid);
      this.cards.push(this.cards[index]);
    },
    addCardFromSearch(card) {
      this.cards.push(card);
    },
    updateDeck() {
      const cardList = this.cards.map((el) => el.uuid);

      if (!this.isCreateDeckNameValid) {
        ElNotification({
          title: 'Error',
          message: 'You must provide a name to the deck',
          type: 'error',
          position: 'bottom-right',
        });
      } else if (!this.isCreateDeckFormatValid) {
        ElNotification({
          title: 'Error',
          message: 'You must provide a format to the deck',
          type: 'error',
          position: 'bottom-right',
        });
      } else {
        axios.patch(
          `${process.env.VUE_APP_API_URL}/deck/${this.deckId}`,
          {
            name: this.deckName,
            format: this.deckFormat.value,
            description: this.deckDesc,
            cards: cardList,
          },
        ).then((res) => {
          ElNotification({
            title: 'Success',
            message: 'Your deck has been modified.',
            type: 'success',
            position: 'bottom-right',
          });
          this.$router.push(`/deck/${this.deckId}`);
        }).catch((err) => {
          ElNotification({
            title: 'Error',
            message: 'There was a problem editing your deck.',
            type: 'error',
            position: 'bottom-right',
          });
          console.log(err);
        });
      }
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
    triggerSearch(cardName) {
      this.mySearch = cardName;
      if (cardName !== '') {
        axios.post(
          `${process.env.VUE_APP_API_URL}/cards/search`,
          {
            name: cardName,
          },
        )
          .then((response) => {
            this.cardsSearched = response.data.data;
            console.log(this.cardsSearched);
          });
      } else {
        this.cardsSearched = [];
      }
    },
    importDeck() {
      axios.post(
        `${process.env.VUE_APP_API_URL}/deck/import`,
        {
          cardList: this.deckImport,
        },
      )
        .then((response) => {
          this.cards = [...this.cards, ...response.data.data.cards];
          response.data.data.valid_lines.forEach((vc) => {
            setTimeout(() => {
              ElNotification({
                title: 'Success',
                message: `${vc} : has been added to your deck`,
                type: 'success',
                position: 'bottom-right',
              });
            }, 50);
          });
          response.data.data.invalid_lines.forEach((ic) => {
            setTimeout(() => {
              ElNotification({
                title: 'Error',
                message: `${ic} : not found`,
                type: 'error',
                position: 'bottom-right',
              });
            }, 51);
          });
        });

      // Close the modal
      this.importModalShow = false;
    },
    setImport(deckImport) {
      this.deckImport = deckImport;
    },
  },
  computed: {
    sortByTypes() {
      const newCards = [];
      this.cards.forEach((card) => {
        if (newCards.findIndex((nc) => nc.uuid === card.uuid) === -1) {
          const obj = { ...card, ...{ number: 1 } };
          newCards.push(obj);
        } else {
          newCards[newCards.findIndex((nc) => nc.uuid === card.uuid)].number += 1;
        }
      });
      const res = {};
      newCards.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });
      const cardTypes = [...new Set(newCards.map((c) => c.types.split(',')[c.types.split(',').length - 1]))];
      //
      cardTypes.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      });
      cardTypes.forEach((t) => {
        res[t] = [];
      });
      newCards.forEach((c) => {
        res[c.types.split(',')[c.types.split(',').length - 1]].push(c);
      });
      return res;
    },
    isCreateDeckNameValid() {
      return this.deckName;
    },
    isCreateDeckFormatValid() {
      return this.deckFormat;
    },
  },
  watch: {
    sortByTypes() {
      // console.log(newVal);
    },
  },
  data() {
    return {
      deckId: '',
      deckName: '',
      deckFormat: {},
      deckDesc: '',
      mySearch: '',
      possibleFormats: [],
      cards: [],
      cardsSearched: [],
      importModalShow: false,
      deckImport: '',
    };
  },
};
</script>

<style lang="scss">

.deck-editor-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px;
  background: $light-glass-background;
}

.currentDeck {
  display: flex;
  flex-direction: column;
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

.title {
  text-align: center;
}

.infos-search-container {
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 12px;
}

.deckInfos {
  display: flex;
  flex-direction: column;
}

.title::after {
  content: '';
  width: 100px;
  height: 3px;
  display: block;
  margin: 5px auto;

  background: $title-underline-color;
}

.deck-editor-container .desc_input .el-textarea__inner{
  background: $dark-background;
}

.deck-editor-container .desc_input .el-input__count {
  background: transparent;
}
.deck-editor-container .desc_input,
.deckInfos .deckInputContainer,
.deck-editor-container .deckActions {
  margin: 10px auto 0 auto;
  width: 80%;
}
.deck-editor-container .deckActions {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.deckInfos .deckInputContainer {
  display: flex;
  flex-direction: row;
  justify-content: center
}

.deckActions .importAction {
  padding: 6px 12px;
  border-radius: 16px;
  color: white;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.deck-editor-container .formInput .el-input__wrapper {
  background: $dark-background;
  margin: 0 10px 0 0;
  max-width: 500px;
  width: auto;
  min-width: 100px;
}

.deck-editor-container .desc_input .el-textarea__inner {
  box-shadow: none;
  color: $text-color;
  max-height: 140px;
}
.deck-editor-container .desc_input .el-textarea__inner::placeholder {
  color: $text-color;
}

.deck-editor-container .select .el-input__wrapper {
  background: $dark-background;
}
.deck-editor-container .select .vs__dropdown-menu {
  background: $dark-background;
  color: $text-color;
}
.deck-editor-container .select .vs__dropdown-toggle {
  background: $dark-background;
}
.deck-editor-container .select .vs__dropdown-menu li:hover {
  background: $light-glass-background-select;
}

.deck-editor-container .updateDeck {
  position: initial;
  z-index: 1;
  display: flex;
  margin-left: auto;
}

.searchCards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
}

.deck-editor-container .search_input {
  height: 40px;
  margin: 10px auto 0 auto;
  width: 80%;
}
.deck-editor-container .search_input .el-input__wrapper {
  max-width: none;
  width: 100%;
  margin: 0;
}

.deck-editor-container .searchCards .performSearch {
  position: absolute;
  top: 44px;
  z-index: 3;
  right: 10%;
  opacity: 0.7;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
}

.deck-editor-container .searchCards .performSearch:hover {
  opacity: 1;
}

.searchResult {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  overflow-y: scroll;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
  align-content: start;
}

.select {
  width: 310px;
}

.vs__dropdown-toggle {
  background: $light-glass-background;
}
.select .vs__search::placeholder {
  color: white !important;
  font-size: 14px;
}
.select .vs__selected,
.select .vs__selected-options {
  color: $text-color;
}

.select .vs__clear svg {
  fill: $text-color;
}

.select .vs__open-indicator {
  fill: $text-color;
  transform: scale(0.9);
}

.vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(0.9);
}

.select .vs__dropdown-menu {
  background: $light-glass-background-select;
  color: $text-color;
}

.select .vs__dropdown-menu li:hover {
  background: $medium-glass-background-select;
}

.normal-btn {
  padding: 4px 8px;
  border-radius: 5px;

  color: $text-color;
  background: $medium-glass-background;
  transition: 0.3s;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    background: $strong-glass-background;
  }
  &.margin-bottom {
    margin-bottom: 10px;
  }
}

.modal-actions {
  align-self: end;
  display: inline-flex;
  gap: 10px;
  margin: 10px;
}

.importInput {
  width: 80%;
}

</style>
