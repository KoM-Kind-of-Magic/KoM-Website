<template>
  <div class="wrapper">
    <div class="error" v-if="error.show">
      {{error.message}}
    </div>
    <div class="main-head">
      <div class="deck-name">{{deck.name}}</div>
      <div class="deck-desc" v-show="deck.format">{{deck.format}}</div>
    </div>
    <div class="content">
      <div class="masonry" v-if="deck.cards.length>0">
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
    <div class="side">
      <div class="normal-btn margin-bottom" @click="editDeck()" @keydown="c">
        &#x270E;&nbsp;Edit
      </div>
      <div class="normal-btn margin-bottom" @click="deleteModalShow = true" @keydown="c">
        &#128465;&nbsp;Delete
      </div>
    </div>
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
import CardLine from '../components/card/CardLine.vue';

export default {
  name: 'DeckView',
  components: {
    PopIn,
    CardLine,
  },
  data() {
    return {
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
  mounted() {
    this.getDeck();
  },
  methods: {
    getDeck() {
      axios.get(`http://localhost:8081/deck/${this.deckId}`)
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
      axios.delete(`http://localhost:8081/deck/${this.deckId}`)
        .then((response) => {
          console.info(response.data.message);
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.error(error);
        });
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

  .wrapper {
    margin: 12px;
    display: grid;
    grid-gap: 12px;
    grid-template-areas:
      "header"
      "content"
      "sidebar";
  }

  @media (min-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr 300px;
      grid-template-areas:
        "content  header"
        "content sidebar";
    }
  }

  .main-head {
    grid-area: header;
    color: white;

    & .deck-name {
      font-size: 20px;
      margin: 12px;
      font-weight: bold;
    }
    & .deck-desc {
      font-size: 14px;
      margin: 12px;
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
