<template>
  <div>
    <div class="view-header">
      <div class="page-title">Your decks</div>
      <div class="createDeck" @click="createDeckModalShow = true" @keydown="c">
        New deck
      </div>
    </div>
    <div class="content">
      <el-row v-if="deckList.length > 0" :gutter="20">
        <el-col
          v-for="(deck, index) in deckList"
          :key="index"
          :xs="8"
          :sm="6"
          :md="5"
          :lg="6"
          :xl="6"
        >
          <div class="deck-item" :style="`z-index: calc(9999 - ${index});`">
            <div
                class="deck-back"
                @click="openDeck(deck.deck_id)"
                @keydown="c"
              >
              <div class="deck-infos">
                <div class="name">{{ deck.name }}</div>
                <div class="format">{{ deck.format }}</div>
                <div class="description">{{ deck.description }}</div>
                <div class="edit">
                  <el-button text class="button" @click.stop="editDeck(deck.deck_id)">
                    &nbsp;Edit&nbsp;
                  </el-button>
                </div>
              </div>
            </div>
            <div class="deck-image">
              <img
                alt="card's image"
                :src="`https://api.scryfall.com/cards/${deck.representingCard.scryfallId}?format=image`"
                v-if="deck.representingCard"
              />
              <img
                alt="card's image"
                src="@/assets/images/MagicCardBack.png"
                v-else
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Transition style="z-index: 99999;">
      <PopIn
        v-show="createDeckModalShow"
        title="Create a new deck"
        @close="createDeckModalShow = false"
      >
        <div class="input">
          <Input
            @getInputValue="setDeckName"
            placeholder="Name"
            class="name_input"
          />
        </div>
        <div class="input">
          <SelectComp
            id="formatSelect"
            placeholder="Select a Deck format"
            @getInputValue="setDeckFormat"
          />
        </div>
        <div class="input">
          <TextArea
            placeholder="Description"
            class="desc_input"
            @getInputValue="setDeckDesc"
          />
        </div>
        <div class="modal-actions">
          <div class="normal-btn" @click="createDeck()" @keydown="c">
            Create
          </div>
          <div class="normal-btn" @click="deleteModalShow = false" @keydown="c">
            Cancel
          </div>
        </div>
      </PopIn>
    </Transition>
  </div>
</template>

<script>
import axios from 'axios';
import PopIn from '@/components/PopIn.vue';
import Input from '@/components/Input.vue';
import SelectComp from '@/components/Select.vue';
import TextArea from '@/components/TextArea.vue';

import {
  ElRow,
  ElCol,
  ElButton,
} from 'element-plus';

export default {
  name: 'DeckListsView',
  components: {
    Input,
    SelectComp,
    TextArea,
    PopIn,
    'el-row': ElRow,
    'el-col': ElCol,
    'el-button': ElButton,
  },
  data() {
    return {
      deckList: [],
      createDeckModalShow: false,
    };
  },
  mounted() {
    this.getDeckList();
  },
  methods: {
    getDeckList() {
      axios.get('http://localhost:8081/deck')
        .then((response) => {
          this.deckList = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCardImageUrl(data) {
      let url = '';
      if (data) {
        url = `https://api.scryfall.com/cards/${data.scryfallId}?format=image`;
      } else {
        url = '@/assets/images/MagicCardBack.png';
      }
      return url;
    },
    openDeck(id) {
      this.$router.push({ name: 'deck', params: { id } });
    },
    editDeck(id) {
      this.$router.push({ name: 'deckEditor', params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
    max-width: 1080px;
    margin: auto;
  }
  .el-row {
    margin: 0px !important;
    justify-content: center;
    display: flex;
  }
  .el-col {
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .el-col:last-child {
    margin-bottom: 0;
  }
  .deck-item {
    aspect-ratio: 2.5 / 3.49;
    position: relative;

    & .deck-image, & .deck-back {
      position: absolute;
    }
    & .deck-image {
      pointer-events:none;

      & img {
        width: 100%;
        border-radius: 5.584% / 4%;
        background-image: url('@/assets/images/MagicCardBack.png');
      }
    }
    & .deck-back {
      transition: 0.3s;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover {
        padding-left: 100%;
      }
      & .deck-infos {
        padding: 8px;
        gap: 8px;
        display: flex;
        flex-direction: column;
        background-color: #202020;
        color: white;
        border-radius: 5.584% / 4%;
        height: calc(100% - 16px);
        word-break: break-all;

        & .name {
          font-size: larger;
        }
        & .format {
          font-size: small;
        }
        & .description {
          font-size: medium;
        }
        & .edit {
          display: flex;
          align-self: end;
          justify-content: end;
        }
      }
    }
  }
  .view-header {
    display: flex;
    justify-content: space-between;
    max-width: 1080px;
    margin: auto;
    margin-bottom: 20px;

    & .page-title {
      font-size: 32px;
    }
    & .createDeck {
      display: flex;
      padding: 6px 12px;
      border-radius: 16px;
      color: white;
      background: rgba(255, 255, 255, 0.3);
      transition: 0.3s;
      align-self: center;
      &:hover {
        cursor: pointer;
        background: $strong-glass-background;
      }
    }
  }
  .modal-actions {
    align-self: end;
    display: inline-flex;
    gap: 10px;
    margin: 10px;
  }
  .input {
    margin-bottom: 20px;
  }
  .desc_input .el-textarea__inner {
    background: $light-glass-background-select;
    box-shadow: none;
    width: 310px;
    color: $text-color;
    padding: 10px;
    max-height: 150px;
  }
  .desc_input .el-input__count {
    background: transparent;
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
</style>
