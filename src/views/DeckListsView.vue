<template>
  <div>
    <div class="view-header">
      <div class="page-title">Your decks</div>
      <div class="sub-btns-title">
        <div class="button-title" @click="createDeckModalShow = true" @keydown="c">
          New deck
        </div>
      </div>
    </div>
    <div class="content">
      <el-row v-if="deckList.length > 0" :gutter="20">
        <el-col
          v-for="(deck, index) in deckList"
          :key="index"
          :xs="12"
          :sm="8"
          :md="8"
          :lg="6"
          :xl="4"
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
                :src="`https://api.scryfall.com/cards/${deck.representingCard.cardIdentifier.scryfallId}?format=image`"
                v-if="deck.representingCard"
                class="card-image"
              />
              <img
                alt="card's image"
                src="@/assets/images/MagicCardBack.png"
                v-else
                class="card-image"
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
          <el-input
            v-model="newDeck.name"
            placeholder="Name"
            class="formInput"
          />
        </div>
        <div class="input">
          <v-select
            v-if="possibleFormats.length>0"
            class="select"
            label="Select a Deck format"
            :options="possibleFormats"
            v-model="newDeck.format">
          </v-select>
        </div>
        <div class="input">
          <el-input
            v-model="newDeck.description"
            placeholder="Description"
            class="formTextarea"
            maxlength="140"
            show-word-limit
            type="textarea"
            :rows='4'
          />
        </div>
        <div class="modal-actions">
          <div class="normal-btn" @click="createDeck()" @keydown="c">
            Create
          </div>
          <div class="normal-btn" @click="createDeckModalShow = false" @keydown="c">
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import {
  ElRow,
  ElCol,
  ElButton,
  ElInput,
  ElNotification,
} from 'element-plus';

export default {
  name: 'DeckListsView',
  components: {
    'v-select': vSelect,
    PopIn,
    'el-row': ElRow,
    'el-col': ElCol,
    'el-button': ElButton,
    'el-input': ElInput,
  },
  computed: {
    isCreateDeckNameValid() {
      return this.newDeck.name;
    },
    isCreateDeckFormatValid() {
      return this.newDeck.format;
    },
  },
  created() {
    this.getPossibleFormats();
  },
  mounted() {
    this.getDeckList();
  },
  methods: {
    getDeckList() {
      axios.get(
        `${process.env.VUE_APP_API_URL}/deck`,
        {
          headers: {
            'x-access-token': this.$store.getters.getUserToken,
          },
        },
      )
        .then((response) => {
          this.deckList = response.data.data;
        })
        .catch((error) => {
          ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
            position: 'bottom-right',
          });
        });
    },
    getCardImageUrl(data) {
      let url = '';
      if (data) {
        url = `https://api.scryfall.com/cards/${data.cardIdentifier.scryfallId}?format=image`;
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
    getPossibleFormats() {
      axios.get(`${process.env.VUE_APP_API_URL}/deck/formats`)
        .then((response) => {
          this.possibleFormats = JSON.parse(JSON.stringify(response.data.data));
          this.newDeck.format = JSON.parse(JSON.stringify(response.data.data[0]));
        });
    },
    createDeck() {
      if (this.isCreateDeckNameValid && this.isCreateDeckFormatValid) {
        axios.post(
          `${process.env.VUE_APP_API_URL}/deck`,
          this.newDeck,
          {
            headers: {
              'x-access-token': this.$store.getters.getUserToken,
            },
          },
        )
          .then((response) => {
            ElNotification({
              title: 'Success',
              message: 'Deck created !',
              type: 'success',
              position: 'bottom-right',
            });
            setTimeout(() => {
              this.$router.push({ name: 'deckEditor', params: { id: response.data.data.deck_id } });
            }, 200);
          })
          .catch((error) => {
            ElNotification({
              title: 'Error',
              message: error.message,
              type: 'error',
              position: 'bottom-right',
            });
          });
      } else if (!this.isCreateDeckNameValid) {
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
      }
    },
  },
  data() {
    return {
      deckList: [],
      newDeck: {
        name: '',
        description: '',
        format: '',
        uid: '',
      },
      possibleFormats: [],
      createDeckModalShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  .content {
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    margin: auto;
  }
  .el-row {
    margin: 0px !important;
    justify-content: center;
    display: flex;
    padding: 12px;
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
        background-image: url('@/assets/images/MagicCardBack.png');
      }
    }
    & .deck-back {
      transition: 0.3s;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover {
        animation: card-anim 0.4s ease-in-out 0s 1 normal both;
      }
      & .deck-infos {
        padding: 8px;
        display: flex;
        flex-direction: column;
        background: linear-gradient(#202020ba, #202020ba), url('@/assets/images/MagicCardBack.png');
        background-size: cover;
        color: white;
        border-radius: 5.584% / 4%;
        height: calc(100% - 16px);
        word-break: break-all;

        & div {
          padding: 8px;
        }
        & .name {
          font-size: larger;
          text-decoration: underline;
          text-underline-position: under;
          text-decoration-color: #822a4a;
          text-decoration-thickness: 3px;
        }
        & .format {
          font-size: small;
          font-style: italic;
          color: lightgrey;
        }
        & .description {
          font-size: medium;
          flex: 1;
        }
        & .edit {
          display: flex;
          align-self: end;
          justify-content: end;
        }
      }
    }
  }
  @keyframes card-anim {
    0% {
      padding-left: 0px;
    }
    50% {
      padding-left: 100%;
    }
    100% {
      padding-left: 0%;
      z-index: 99999999;
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
  .select .el-input__wrapper {
    background: $dark-background;
  }
  .select .vs__dropdown-menu {
    background: $dark-background;
    color: $text-color;
  }
  .select .vs__dropdown-toggle {
    background: $dark-background;
  }
  .select .vs__dropdown-menu li:hover {
    background: $light-glass-background-select;
  }
  .select {
    width: 310px;
    text-transform: capitalize;
  }

.vs__dropdown-toggle {
  background: $light-glass-background;
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
.formInput .el-input__wrapper{
  background: $light-glass-background-select;
  box-shadow: none;
  width: 290px;
}

.formInput .el-input__wrapper input {
  color: $text-color !important;
}

.formTextarea {
  --el-input-bg-color: #2d3039;
  --el-input-text-color: white;
  width: 310px;
}
</style>
