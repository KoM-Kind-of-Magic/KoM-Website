<template>
  <div>
    <div class="error" v-if="error.show">
      {{error.message}}
    </div>
    <div class="view-header">
      <div class="page-title">
        <div class="deck-name">{{deck.name}}</div>
        <div class="deck-desc" v-show="deck.format">{{deck.format}}</div>
      </div>
      <div class="right-side">
      </div>
    </div>
    <div class="view-sub-header">
      <div class="view-tabs">
        <div
          :class="(tab.routeName === $route.name ? 'selected-tab' : '') + ' tab'"
          v-for="(tab, i) in tabs"
          :key="i"
          @click="openTab(tab.routeName)"
          @keydown="c"
        >
          {{tab.name}}
        </div>
      </div>
      <div class="right-btns">
        <div class="view-side-btns" @click="exportDeck()" @keydown="c">
          <el-icon>
            <Download />
          </el-icon>
          &nbsp;Export
        </div>
        <div class="view-side-btns" @click="editDeck()" @keydown="c">
          <el-icon>
            <Edit />
          </el-icon>
          &nbsp;Edit
        </div>
        <div class="view-side-btns" @click="deleteModalShow = true" @keydown="c">
          <el-icon>
            <Delete />
          </el-icon>
          &nbsp;Delete
        </div>
      </div>
    </div>
    <router-view
      :sortByTypes="sortByTypes"
      :cards="deck.cards"
      v-if="Object.keys(sortByTypes).length > 0"
    ></router-view>
    <Transition>
      <PopIn
        v-show="deleteModalShow"
        :title="`Are you sure to delete ${deck.name} ?`"
        @close="deleteModalShow = false"
      >
        <div class="modal-actions">
          <div class="normal-btn" @click="DeleteDeck()" @keydown="c">
            Confirm delete
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

import {
  ElIcon,
} from 'element-plus';
import {
  Edit,
  Delete,
  Download,
} from '@element-plus/icons-vue';

export default {
  name: 'DeckView',
  components: {
    'el-icon': ElIcon,
    PopIn,
    Edit,
    Delete,
    Download,
  },
  data() {
    return {
      tabs: [{
        name: 'Overview',
        routeName: 'deck',
      }, {
        name: 'Starting Hand',
        routeName: 'deckHand',
      },
      ],
      deck: {
        name: '',
        cards: [],
        format: '',
        type: '',
        createdAt: '',
      },
      error: {
        show: false,
        message: '',
      },
      deleteModalShow: false,
    };
  },
  created() {
    this.getDeck();
  },
  methods: {
    getDeck() {
      axios.get(`${process.env.VUE_APP_API_URL}/deck/${this.deckId}`)
        .then((response) => {
          const deck = response.data.data;
          this.deck = {
            name: deck.name ?? 'Deck with no name',
            cards: deck.cards ?? [],
            format: deck.format ?? '',
            type: deck.type ?? '',
            createdAt: deck.createdAt ?? '',
          };
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.push({ name: 'PageNotFound' });
          } else {
            this.error = {
              show: true,
              message: `Error ${error.response.data.status} : ${error.response.data.message.data}`,
            };
          }
          console.error(error);
        });
    },
    editDeck() {
      this.$router.push({ name: 'deckEditor', params: { id: this.deckId } });
    },
    DeleteDeck() {
      axios.delete(`${process.env.VUE_APP_API_URL}/deck/${this.deckId}`)
        .then((response) => {
          console.info(response.data.message);
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openTab(routeName) {
      this.$router.push({ name: routeName, params: { id: this.deckId } });
    },
    exportDeck() {
      const newCards = [];
      this.deck.cards.forEach((card) => {
        if (newCards.findIndex((nc) => nc.uuid === card.uuid) === -1) {
          const obj = { ...card, ...{ number: 1 } };
          newCards.push(obj);
        } else {
          newCards[newCards.findIndex((nc) => nc.uuid === card.uuid)].number += 1;
        }
      });
      let text = '';
      newCards.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }).forEach((card) => {
        text += `${card.number} ${card.name}\n`;
      });
      const filename = `${this.deck.name}.txt`;

      const element = document.createElement('a');
      element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
  computed: {
    sortByTypes() {
      const newCards = [];
      this.deck.cards.forEach((card) => {
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
    deckId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
  .view-header {
    & .page-title {
      display: flex;
      align-items: baseline;
      gap: 8px;
      text-transform: capitalize;
      & .deck-name {
        font-size: 32px;
      }
      & .deck-desc {
        font-size: 14px;
      }
    }
    & .right-side {
      display: flex;
      gap: 12px;

      & .header-btns {
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
  }
  .view-sub-header {
    display: flex;
    justify-content: space-between;

    & .view-tabs {
      display: flex;
      justify-content: flex-start;
      & .tab {
        padding: 10px;
        border-radius: 8px 8px 0px 0px;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
      & .selected-tab {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    & .right-btns {
      display: flex;
      flex-direction: row;
      gap: 12px;
      margin-bottom: 8px;

      & .view-side-btns {
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
  }
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
    grid-area: content;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
  }
  .side {
    grid-area: sidebar;
    padding: 0 12px;
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

</style>
